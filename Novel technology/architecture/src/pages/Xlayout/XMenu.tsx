import React, { FC, useMemo } from 'react';
import { Menu } from 'antd';
import routes from '@/pages/XRouter/route';
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
            defaultOpenKeys={['1']}
            selectedKeys={selectKeys}
        >
            <Menu.SubMenu key="1" title="业财配置服务">
                {routes.map(route => (
                    <Menu.Item key={route.path}>
                        <Link to={route.path}>{route.name}</Link>
                    </Menu.Item>
                ))}
            </Menu.SubMenu>
        </Menu>
    );
};

export default XMenu;
