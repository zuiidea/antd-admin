import {
  AppstoreOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  RobotOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';

export const ICON_MAP: Record<string, React.ReactNode> = {
  home: <HomeOutlined />,
  'info-c': <InfoCircleOutlined />,
  user: <UserOutlined />,
  team: <TeamOutlined />,
  profile: <ProfileOutlined />,
  'user-add': <UserAddOutlined />,
  settings: <SettingOutlined />,
  tool: <ToolOutlined />,
  robot: <RobotOutlined />,
  'app-store': <AppstoreOutlined />,
};

export function Icon({ name }: { name?: string }) {
  if (!name) return null;
  return ICON_MAP[name] || null;
}

export default Icon;
