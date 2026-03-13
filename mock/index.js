// Consolidated mock server for development (simplified)
const Mock = require('mockjs');
const qs = require('qs');

const ApiPrefix = '/api/v1';

// simple in-memory admin users with richer mock fields
const adminList = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    real_name: '李四',
    nick_name: '超级管理员',
    mobile: '13800000000',
    avatar: Mock.Random.image('100x100', '#4096ff', '#fff', 'png', 'A'),
    role: '管理员',
    department: '运维部',
    permissions: '*',
    status: 1,
    remark: '拥有所有权限',
    lastLogin: Mock.Random.datetime(),
    createdBy: 'system',
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest',
    real_name: '访客',
    nick_name: '访客',
    mobile: '15100000000',
    avatar: Mock.Random.image('100x100', '#ff7f50', '#fff', 'png', 'G'),
    role: '访客',
    department: '外部',
    permissions: '/dashboard,/users,/users/list',
    status: 1,
    remark: '',
    lastLogin: Mock.Random.datetime(),
    createdBy: 'system',
  },
];

// users list
let users = Mock.mock({
  'data|20-30': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|18-60': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar() {
        return Mock.Random.image(
          '100x100',
          '#4096ff',
          '#757575',
          'png',
          this.nickName ? this.nickName.substr(0, 1) : '',
        );
      },
    },
  ],
}).data;

// routes database (source of truth)
const ROUTES_DB = [
  { id: '1', name: '仪表盘', icon: 'home', route: '/dashboard' },
  { id: '2', name: 'Ai会话', icon: 'robot', route: '/ai/chat' },
  { id: '3', name: '用户管理', icon: 'user', route: '/users' },
  {
    id: '4',
    breadcrumbParentId: '3',
    name: '用户列表',
    icon: 'team',
    route: '/users/list',
  },
  {
    id: '5',
    menuParentId: '-1',
    breadcrumbParentId: '4',
    name: '用户详情',
    route: '/users/:id',
  },
  { id: '6', name: '系统设置', icon: 'settings', route: '/sys' },
  {
    id: '7',
    breadcrumbParentId: '6',
    name: '成员列表',
    icon: 'team',
    route: '/admin/list',
  },
  {
    id: '8',
    menuParentId: '-1',
    breadcrumbParentId: '6',
    name: '成员详情',
    icon: 'user',
    route: '/admin/:id',
  },
  {
    id: '9',
    breadcrumbParentId: '6',
    name: '菜单设置',
    icon: 'tool',
    route: '/sys/menu',
  },
  { id: '10', name: '项目介绍', icon: 'info-c', route: '/guide' },
];

// convert routes DB into menus tree used by UI
function buildMenusFromRoutes(db) {
  const items = db
    // exclude routes that should not appear in menu (explicit menuParentId === '-1')
    .filter((r) => !(r.menuParentId === '-1' || r.menuParentId === -1))
    .map((r, idx) => {
      const id = Number(r.id) || r.id;
      // prefer explicit menuParentId, fall back to breadcrumbParentId
      const parentIdRaw = r.breadcrumbParentId ?? null;
      const parentId =
        parentIdRaw === undefined || parentIdRaw === null
          ? null
          : parentIdRaw === '-1'
          ? null
          : Number(parentIdRaw);
      return {
        id,
        title: r.name,
        icon: r.icon,
        route: r.route,
        parentId,
        status: 1,
        sort: idx + 1,
        children: [],
      };
    });

  const map = new Map();
  items.forEach((it) => map.set(it.id, it));
  const roots = [];
  items.forEach((it) => {
    if (it.parentId == null || !map.has(it.parentId)) {
      roots.push(it);
    } else {
      map.get(it.parentId).children.push(it);
    }
  });

  // sort recursively by sort
  const sortRec = (arr) => {
    arr.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    arr.forEach((c) => {
      if (c.children && c.children.length) sortRec(c.children);
    });
  };
  sortRec(roots);
  return roots;
}

const menus = buildMenusFromRoutes(ROUTES_DB);

// dashboard
const Dashboard = Mock.mock({
  'sales|6': [
    {
      'name|+1': 2008,
      'Clothes|200-500': 1,
      'Food|180-400': 1,
      'Electronics|300-550': 1,
    },
  ],
  cpu: { 'usage|50-600': 1, space: 825, 'cpu|40-90': 1 },
  browser: [
    { name: 'Google Chrome', percent: 43.3, status: 1 },
    { name: 'Mozilla Firefox', percent: 33.4, status: 2 },
  ],
});

// simple helper to read cookie token
function parseTokenFromCookie(headers) {
  const cookie = headers.cookie || '';
  const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
  if (!cookies.token) return null;
  try {
    return JSON.parse(cookies.token);
  } catch (e) {
    return null;
  }
}

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req, res) {
    res.json({ success: true, data: Dashboard });
  },

  [`GET ${ApiPrefix}/menus`](req, res) {
    res.json({ success: true, data: menus });
  },

  [`POST ${ApiPrefix}/admin/login`](req, res) {
    const { username, password } = req.body || {};
    const admin = adminList.find(
      (u) => u.username === username && u.password === password,
    );

    if (admin) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie(
        'token',
        JSON.stringify({ id: admin.id, deadline: now.getTime() }),
        { maxAge: 24 * 3600 * 1000, httpOnly: true },
      );
      res.json({ success: true, message: 'Ok', data: null });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Invalid credentials', data: null });
    }
  },

  [`GET ${ApiPrefix}/admin/logout`](req, res) {
    res.clearCookie('token');
    res.json({ success: true, data: null });
  },

  [`GET ${ApiPrefix}/admin`](req, res) {
    const token = parseTokenFromCookie(req.headers);
    const response = {};
    let admin = {};
    if (!token) {
      res
        .status(200)
        .json({ success: false, message: 'Not Login', data: null });
      return;
    }
    response.success = token.deadline > new Date().getTime();
    if (response.success) {
      const adminItem = adminList.find((u) => u.id === token.id);
      if (adminItem) {
        const { password, ...other } = adminItem;
        admin = other;
      }
    }
    res.json({ success: response.success, data: admin || null });
  },

  [`GET ${ApiPrefix}/users`](req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query || {};
    pageSize = Number(pageSize) || 10;
    page = Number(page) || 1;
    let newData = users.slice();
    for (const key in other) {
      if (Object.prototype.hasOwnProperty.call(other, key)) {
        newData = newData.filter(
          (item) => String(item[key]).indexOf(String(other[key])) > -1,
        );
      }
    }
    res.status(200).json({
      success: true,
      data: {
        data: newData.slice((page - 1) * pageSize, page * pageSize),
        total: newData.length,
      },
    });
  },

  [`GET ${ApiPrefix}/user/:id`](req, res) {
    const { id } = req.params || {};
    let item = users.find((u) => String(u.id) === String(id));
    // 如果找不到用户，则生成一个带有相同 id 的 mock 用户，避免 404
    if (!item) {
      item = Mock.mock({
        id: String(id),
        name: '@name',
        nickName: '@last',
        phone: /^1[34578]\d{9}$/,
        'age|18-60': 1,
        address: '@county(true)',
        isMale: '@boolean',
        email: '@email',
        createTime: '@datetime',
        avatar() {
          return Mock.Random.image(
            '100x100',
            '#4096ff',
            '#757575',
            'png',
            this.nickName ? this.nickName.substr(0, 1) : '',
          );
        },
      });
    }
    // enrich with some additional mock fields: phone model and browsing history
    const enriched = {
      ...item,
      // ensure lastLogin exists for user detail view (used by UI)
      lastLogin: item.lastLogin || Mock.Random.datetime(),
      phoneModel: Mock.Random.pick([
        'iPhone 13',
        'iPhone 14 Pro',
        'Samsung S22',
        'Huawei P50',
        'Xiaomi 12',
      ]),
      browsingHistory: Mock.mock({
        'data|3-6': [
          {
            url: '@url',
            title: '@title',
            time: '@datetime',
          },
        ],
      }).data,
    };
    const { ...other } = enriched;
    res.status(200).json({ success: true, data: other });
  },

  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json({ success: true, data: ROUTES_DB });
  },

  // admin accounts CRUD
  [`GET ${ApiPrefix}/admins`](req, res) {
    res.status(200).json({
      success: true,
      data: { data: adminList, total: adminList.length },
    });
  },

  [`GET ${ApiPrefix}/admin/:id`](req, res) {
    const { id } = req.params || {};
    const item = adminList.find((u) => String(u.id) === String(id));
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: 'Not found', data: null });
    const { password, ...other } = item;
    res.status(200).json({ success: true, data: other });
  },

  [`POST ${ApiPrefix}/admin`](req, res) {
    const body = req.body || {};
    const id = adminList.length
      ? Math.max(...adminList.map((u) => u.id)) + 1
      : 1;

    const next = { id, ...body };
    adminList.push(next);
    const { password, ...other } = next;
    res.status(200).json({ success: true, data: other });
  },

  [`PATCH ${ApiPrefix}/admin/:id`](req, res) {
    const { id } = req.params || {};
    const body = req.body || {};
    const idx = adminList.findIndex((u) => String(u.id) === String(id));
    if (idx === -1)
      return res
        .status(404)
        .json({ success: false, message: 'Not found', data: null });

    adminList[idx] = { ...adminList[idx], ...body };
    const { password, ...other } = adminList[idx];
    res.status(200).json({ success: true, data: other });
  },
};
