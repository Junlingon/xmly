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
        ],
    },
];

export default routes;
