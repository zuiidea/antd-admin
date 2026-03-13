import useGlobalSync from '@/hooks/useGlobalSync';
import {
  BulbOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Tooltip, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { setLocale as setUmiLocale } from 'umi';

type Props = {
  goProfile?: () => void;
  onLogout?: () => void;
};

export default function TopbarControls({ goProfile, onLogout }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const currentAdmin = useGlobalSync((s) => s.currentAdmin);
  const isLoggedIn = useGlobalSync((s) => s.isLoggedIn);

  useEffect(() => {
    const dm = localStorage.getItem('app-dark-mode');
    if (dm === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement)
        await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (e) {
      void 0;
    }
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');

    localStorage.setItem('app-dark-mode', String(next));
  };

  const changeLocale = (l: string) => {
    try {
      // ensure umi locale stored, then notify app to update Antd locale immediately
      setUmiLocale(l, true);
      localStorage.setItem('umi_locale', l);
      window.dispatchEvent(new CustomEvent('localechange', { detail: l }));
    } catch (e) {
      window.location.reload();
    }
  };

  const localeMenuItems: MenuProps['items'] = [
    { key: 'en-US', label: 'English' },
    { key: 'zh-CN', label: '中文' },
  ];

  const profileMenuItems: MenuProps['items'] = [
    { key: 'profile', label: '个人信息' },
    { key: 'logout', label: '注销' },
  ];

  const handleProfileClick = (key: string) => {
    if (key === 'profile') {
      goProfile && goProfile();
    } else if (key === 'logout') {
      onLogout && onLogout();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
        <Button
          type="text"
          onClick={toggleFullscreen}
          icon={
            isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
          }
        />
      </Tooltip>

      <Tooltip title={darkMode ? '浅色模式' : '暗黑模式'}>
        <Button type="text" onClick={toggleDarkMode} icon={<BulbOutlined />} />
      </Tooltip>

      <Dropdown
        menu={{
          items: localeMenuItems,
          onClick: ({ key }) => changeLocale(String(key)),
        }}
        placement="bottomRight"
      >
        <Button type="text" icon={<GlobalOutlined />} />
      </Dropdown>

      {isLoggedIn && currentAdmin ? (
        <Dropdown
          menu={{
            items: profileMenuItems,
            onClick: ({ key }) => handleProfileClick(String(key)),
          }}
          placement="bottomRight"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <Avatar
              size={20}
              src={currentAdmin.avatar}
              icon={!currentAdmin.avatar ? <UserOutlined /> : undefined}
            />
            <span style={{ color: 'inherit' }}>
              {currentAdmin.real_name || currentAdmin.username}
            </span>
          </div>
        </Dropdown>
      ) : null}
    </div>
  );
}
