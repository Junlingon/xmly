import { lazy } from 'react';

const routes = [
    {
        name: 'table表单',
        path: '',
        children: [
            {
                name: '基本用法',
                path: '/baseTable',
                component: lazy(
                    () =>
                        import(
                  /* webpackChunkName: "table" */ '../tables/baseTable'
                        )
                ),
            },
            {
                name: 'Jsx风格Api',
                path: '/jsxTable',
                component: lazy(
                    () =>
                        import(
                  /* webpackChunkName: "table" */ '../tables/jsxApiTable'
                        )
                ),
            },
            {
                name: '可选择',
                path: '/checkTable/:id',
                component: lazy(
                    () =>
                        import(
                  /* webpackChunkName: "table" */ '../tables/checkTable'
                        )
                ),
            },
            {
                name: '筛选排序',
                path: '/fitterOrderTable/:id',
                component: lazy(
                    () =>
                        import(
                  /* webpackChunkName: "table" */ '../tables/fitterOrderTable'
                        )
                ),
            },
            {
                name: 'tabs测试',
                path: '/tabs',
                component: lazy(
                    () =>
                        import(
                  /* webpackChunkName: "table" */ '../tab/index'
                        )
                ),
            },
        ],
    },
];

export default routes;
