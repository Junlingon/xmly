import React, { FC, useMemo } from 'react';
import { Menu } from 'antd';
import routes, { Routes } from '@/pages/XRouter/router';
import { Link, useLocation } from 'react-router-dom';

interface Location {
  pathname: string;
}
type SelectKeys = [string];

const XMenu: FC = () => {
  const location = useLocation<Location>();

  const selectKeys: SelectKeys = useMemo<SelectKeys>(() => {
    return [location.pathname];
  }, [location.pathname]);

  return (
    <Menu
      className="h-full"
      theme="dark"
      mode="inline"
      defaultOpenKeys={routes
        .filter(route => Array.isArray(route.children))
        .map(route => route.path)}
      selectedKeys={selectKeys}
    >
      {recursionMenu(routes)}
    </Menu>
  );
};

// Todo: 这个地方必须要用函数执行 不能用组件方式, 因为用组件方式菜单的padding-left会计算出问题, 永远为0px
function recursionMenu(routeList: Routes[], path = '') {
  return (
    <>
      {routeList.map((route: Routes) => {
        if (Array.isArray(route.children) && route.children.length > 0) {
          return (
            <Menu.SubMenu key={route.path} title={route.name}>
              {recursionMenu(route.children, path + route.path)}
            </Menu.SubMenu>
          );
        }

        if (route.component) {
          return (
            <Menu.Item key={path + route.path}>
              <Link to={path + route.path}>{route.name}</Link>
            </Menu.Item>
          );
        }
      })}
    </>
  );
}

export default XMenu;
