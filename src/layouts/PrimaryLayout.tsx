import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Drawer, Layout, Menu, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { history, Link, useLocation } from 'umi';

import { ICON_MAP } from '@/components/IconMap';
import TopbarControls from '@/components/TopbarControls';
import useGlobalSync from '@/hooks/useGlobalSync';
import useIsMounted from '@/hooks/useIsMounted';

import { Admin } from '@/types/admin';
import config from '@/utils/config';
import api from '@/utils/request';
import useGlobalStore from '../store/useGlobalStore';

import adminService from '../services/admin';
import menuService from '../services/menu';
import { MenuItem } from '../types/menu';
import BaseLayout from './BaseLayout';
import './index.less';

const { Sider, Header } = Layout;

// keep warned paths module-level so dev StrictMode remounts don't re-show warnings
const WARNED_PATHS = new Set<string>();

type FrontendMenu = {
  key: string;
  title: string;
  icon?: string;
  path?: string;
  children?: FrontendMenu[];
};

type RouteEntry = {
  id: number | string;
  route?: string;
  name?: string;
  breadcrumbParentId?: number | string | null;
  icon?: string;
};

type BreadcrumbItem = {
  key: string;
  title: string;
  path: string;
  icon?: string;
};

function buildMenuItems(items: FrontendMenu[]): any[] {
  return items.map((it: FrontendMenu) => {
    const iconKey = it.icon || it.key;
    if (it.children && it.children.length) {
      return {
        key: it.key,
        icon: ICON_MAP[iconKey],
        label: it.title,
        children: buildMenuItems(it.children),
      };
    }
    return {
      key: it.key,
      icon: ICON_MAP[iconKey],
      label: <Link to={it.path || '/'}>{it.title}</Link>,
    };
  });
}

export default function PrimaryLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const currentAdmin = useGlobalSync((s) => s.currentAdmin) as
    | Admin
    | undefined;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menus, setMenus] = useState<MenuItem[] | null>(null);
  const [routesDb, setRoutesDb] = useState<RouteEntry[] | null>(null);

  useEffect(() => {
    const v = localStorage.getItem('app-sider-collapsed');
    if (v !== null) setCollapsed(v === 'true');
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // load menus from API so admin changes (status/sort) reflect immediately
  const isMounted = useIsMounted();
  useEffect(() => {
    (async () => {
      const res = await menuService.listMenus();
      if (!isMounted()) return;
      // 服务现在保证返回统一的 data（即数组或期望类型），不再兼容旧格式
      setMenus(res as MenuItem[]);
    })();
  }, [isMounted]);

  // load raw routes DB to support breadcrumb for parameterized routes not present in menus
  useEffect(() => {
    (async () => {
      try {
        const r = await api('/routes');
        if (!isMounted()) return;
        setRoutesDb(r as RouteEntry[]);
      } catch (e) {
        void e;
      }
    })();
  }, [isMounted]);

  const filteredMenu = useMemo(() => {
    // normalize currentAdmin.permissions to an array of paths or '*' string
    const permsRaw: Admin['permissions'] | null =
      (currentAdmin && currentAdmin.permissions) || null;
    let perms: string[] = [];
    if (typeof permsRaw === 'string') {
      perms = permsRaw
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    const isAllowed = (item: FrontendMenu): boolean => {
      // if no permissions configured for this user, deny access to guarded items
      if (!perms || !perms.length) return false;
      if (item.path && perms.includes(item.path)) return true;
      // also allow matching by menu key (e.g. perms may contain '/dashboard' while item.path is '/')
      if (item.key && perms.includes('/' + String(item.key))) return true;
      if (item.children && item.children.length) {
        return item.children.some((c: FrontendMenu) => isAllowed(c));
      }
      return false;
    };
    // choose source menu: API-loaded menus (if available) transformed to front-end shape
    const source = (() => {
      if (!menus || !menus.length) return [];

      // helper to normalize a tree node to expected front-end shape
      const normalizeNode = (m: MenuItem): FrontendMenu => ({
        key: m.route
          ? String(m.route).replace(/^\//, '') || String(m.id)
          : String(m.id),
        title: m.title,
        icon: m.icon || String(m.id),
        path: m.route || '/',
        children: Array.isArray(m.children)
          ? m.children.map(normalizeNode)
          : [],
      });

      // detect if API returned a nested tree (children present) or flat list (parentId fields)
      const looksNested = menus.some(
        (m: MenuItem) => Array.isArray(m.children) && m.children.length,
      );
      if (looksNested) {
        const tree = menus
          .filter((m: MenuItem) => m.status === undefined || m.status === 1)
          .map(normalizeNode) as FrontendMenu[];
        // sort recursively
        const sortRec = (arr: FrontendMenu[]) => {
          arr.sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0));
          arr.forEach(
            (c) => c.children && sortRec(c.children as FrontendMenu[]),
          );
        };
        sortRec(tree);
        return tree;
      }

      // otherwise treat as flat list with parentId
      const map = new Map<number, FrontendMenu>();
      const active = menus.filter(
        (m: MenuItem) => m.status === undefined || m.status === 1,
      );
      active.forEach((m: MenuItem) =>
        map.set(m.id, normalizeNode(m) as FrontendMenu),
      );
      const roots: FrontendMenu[] = [];
      active.forEach((m: MenuItem) => {
        const node = map.get(m.id) as FrontendMenu;
        if (m.parentId === null || m.parentId === undefined) roots.push(node);
        else {
          const parent = map.get(m.parentId);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(node);
          } else roots.push(node);
        }
      });
      const sortRec = (arr: FrontendMenu[]) => {
        arr.sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0));
        arr.forEach((c) => c.children && sortRec(c.children as FrontendMenu[]));
      };
      sortRec(roots);
      return roots;
    })();

    // treat '*' as full access (return everything from source)
    if (permsRaw === '*') return source;

    return source.filter((it: FrontendMenu) => isAllowed(it));
  }, [currentAdmin, menus]);

  // route-level guard: prevent access to routes not covered by currentAdmin.permissions
  useEffect(() => {
    const path = pathname;
    // allow public paths
    if (!currentAdmin) return;

    const permsRaw: Admin['permissions'] | null =
      currentAdmin.permissions || null;
    if (permsRaw === '*') return;

    const perms =
      typeof permsRaw === 'string'
        ? permsRaw
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const pathAllowedByPerm = (perm: string) => {
      if (!perm) return false;
      if (perm === path) return true;
      // treat perm as pattern if it contains ':'
      if (perm.indexOf(':') >= 0) {
        try {
          const pattern = '^' + perm.replace(/:[^/]+/g, '[^/]+') + '$';
          const re = new RegExp(pattern);
          return re.test(path);
        } catch (e) {
          return false;
        }
      }
      return false;
    };

    const allowed = perms.some(pathAllowedByPerm);
    if (!allowed) {
      // also allow if filteredMenu contains a matching path/pattern
      const menuAllows = (() => {
        const checkItem = (it: FrontendMenu): boolean => {
          if (it.path === path) return true;
          if (typeof it.path === 'string' && it.path.indexOf(':') >= 0) {
            try {
              const pattern = '^' + it.path.replace(/:[^/]+/g, '[^/]+') + '$';
              const re = new RegExp(pattern);
              if (re.test(path)) return true;
            } catch (e) {
              void e;
            }
          }
          if (it.children && it.children.length)
            return it.children.some(checkItem);
          return false;
        };
        return filteredMenu && filteredMenu.some(checkItem);
      })();

      if (!menuAllows) {
        if (!WARNED_PATHS.has(path)) {
          WARNED_PATHS.add(path);
          message.warning('没有权限访问此页面');
        }
        if (history.location.pathname !== '/') history.replace('/');
      }
    }
  }, [pathname, currentAdmin, filteredMenu, routesDb]);

  const menuItems = useMemo(
    () => buildMenuItems(filteredMenu as FrontendMenu[]),
    [filteredMenu],
  );

  // try to find the active key from pathname
  const selectedKeys = useMemo(() => {
    const findKey = (items: FrontendMenu[]): string | null => {
      for (const it of items) {
        if (it.path === pathname) return it.key;
        if (it.children) {
          const child = findKey(it.children);
          if (child) return child;
        }
      }
      return null;
    };
    const k = findKey(filteredMenu);
    return k ? [k] : [];
  }, [pathname, filteredMenu]);

  // find parent keys to open corresponding submenu
  const defaultOpenKeys = useMemo(() => {
    if (!selectedKeys.length) return [];
    const target = selectedKeys[0];
    const findParent = (items: FrontendMenu[]): string | null => {
      for (const it of items) {
        if (
          it.children &&
          it.children.some((c: FrontendMenu) => c.key === target)
        )
          return it.key;
        if (it.children) {
          const sub = findParent(it.children as FrontendMenu[]);
          if (sub) return sub;
        }
      }
      return null;
    };
    const p = findParent(filteredMenu);
    return p ? [p] : [];
  }, [selectedKeys, filteredMenu]);

  const handleCollapse = (c: boolean) => {
    setCollapsed(c);
    localStorage.setItem('app-sider-collapsed', String(c));
  };

  const logout = useGlobalStore.getState().logout;

  const sider = (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      className="app-sider"
    >
      <div className="logo">{config.siteName}</div>
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
      />
    </Sider>
  );

  const header = (
    <Header className="app-header">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Button
            type="text"
            onClick={() => {
              if (isMobile) setMobileOpen(true);
              else handleCollapse(!collapsed);
            }}
            style={{ fontSize: 18 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: '#fff', minWidth: 80, textAlign: 'right' }}>
            {currentAdmin
              ? currentAdmin.real_name || currentAdmin.username
              : ''}
          </div>
          <TopbarControls
            onLogout={async () => {
              await adminService.logout();
              logout();
              history.push('/login');
            }}
            goProfile={() => {
              // Navigate to profile page
              history.push(`/admin/${currentAdmin?.id || 0}`);
            }}
          />
        </div>
      </div>
    </Header>
  );
  // build breadcrumb trail from MENU based on pathname
  const breadcrumb = useMemo(() => {
    const find = (
      items: FrontendMenu[],
      path: string,
    ): FrontendMenu[] | null => {
      for (const it of items) {
        if (it.path === path) return [it];
        if (it.children) {
          const sub = find(it.children, path);
          if (sub) return [it, ...sub];
        }
      }
      return null;
    };

    // exact match first
    let trail = find(filteredMenu, pathname);
    if (!trail) {
      // attempt pattern matching for param routes like /admin/:id
      const patternFind = (
        items: FrontendMenu[],
        path: string,
      ): FrontendMenu[] | null => {
        for (const it of items) {
          if (typeof it.path === 'string' && it.path.indexOf(':') >= 0) {
            try {
              const pattern = '^' + it.path.replace(/:[^/]+/g, '[^/]+') + '$';
              const re = new RegExp(pattern);
              if (re.test(path)) return [it];
            } catch (e) {
              void e;
            }
          }
          if (it.children) {
            const sub = patternFind(it.children, path);
            if (sub) return [it, ...sub];
          }
        }
        return null;
      };

      // attempt prefix matching (e.g., /users -> /users/list)
      const prefixFind = (
        items: FrontendMenu[],
        path: string,
      ): FrontendMenu[] | null => {
        for (const it of items) {
          if (it.path && path.startsWith(it.path) && it.path !== '/')
            return [it];
          if (it.children) {
            const sub = prefixFind(it.children, path);
            if (sub) return [it, ...sub];
          }
        }
        return null;
      };

      trail =
        patternFind(filteredMenu, pathname) ||
        prefixFind(filteredMenu, pathname);

      // try matching against raw routes DB (includes entries excluded from menu via menuParentId === '-1')
      if (!trail && routesDb && routesDb.length) {
        const matchRoute = (routes: RouteEntry[]): RouteEntry | null => {
          for (const it of routes) {
            if (!it.route) continue;
            // exact match
            if (it.route === pathname) return it;
            // param pattern match
            if (typeof it.route === 'string' && it.route.indexOf(':') >= 0) {
              try {
                const pattern =
                  '^' + it.route.replace(/:[^/]+/g, '[^/]+') + '$';
                const re = new RegExp(pattern);
                if (re.test(pathname)) return it;
              } catch (e) {
                void e;
              }
            }
          }
          return null;
        };

        const found = matchRoute(routesDb);
        if (found) {
          const idToRoute = (id: number | string) =>
            routesDb.find((x: RouteEntry) => String(x.id) === String(id));
          const chain: BreadcrumbItem[] = [];
          let cur: RouteEntry | null = found;
          while (cur) {
            // for the current (param) route, use the actual pathname so link works
            chain.unshift({
              key: String(cur.id),
              title: String(cur.name || ''),
              path: cur === found ? pathname : cur.route || '/',
              icon: cur.icon,
            });
            if (!cur.breadcrumbParentId) break;
            cur = idToRoute(cur.breadcrumbParentId) || null;
          }
          trail = chain.length ? chain : null;
        }
      }

      trail = trail || [{ key: 'dashboard', title: 'Dashboard', path: '/' }];
    }
    return trail;
  }, [pathname, filteredMenu, routesDb]);

  // update document title from breadcrumb
  useEffect(() => {
    if (breadcrumb && breadcrumb.length) {
      const last = breadcrumb[breadcrumb.length - 1];

      document.title = `${last.title} - ${config.siteName}`;
    } else {
      document.title = config.siteName;
    }
  }, [breadcrumb]);

  const pageBody = (
    <div className="page-container">
      <Breadcrumb
        className="page-breadcrumb"
        items={breadcrumb.map(
          (b: FrontendMenu | BreadcrumbItem, idx: number) => {
            const IconNode =
              ICON_MAP[(b as any).icon || (b as any).key] || null;
            const titleNode = (
              <span
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                {IconNode}
                <span>{(b as any).title}</span>
              </span>
            );
            return {
              key: (b as any).key,
              title:
                idx < breadcrumb.length - 1 ? (
                  <Link to={(b as any).path}>{titleNode}</Link>
                ) : (
                  titleNode
                ),
            };
          },
        )}
      />
      <div className="page-content">{children}</div>
    </div>
  );

  return (
    <>
      <BaseLayout sider={!isMobile ? sider : undefined} header={header}>
        {pageBody}
      </BaseLayout>
      <Drawer
        open={mobileOpen}
        placement="left"
        onClose={() => setMobileOpen(false)}
        styles={{ body: { padding: 0 } }}
        className="mobile-menu-drawer"
      >
        <div
          className="logo"
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          {config.siteName}
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          onClick={() => setMobileOpen(false)}
        />
      </Drawer>
    </>
  );
}
