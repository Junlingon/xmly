import { lazy, LazyExoticComponent } from 'react';

export interface Routes {
  name: string;
  path: string;
  component?: LazyExoticComponent<any> | (() => any);
  children?: Routes[];
}

const routes: Routes[] = [
  {
    name: '供应商管理',
    path: '/vendor',
    children: [
      {
        name: '供应商管理',
        path: '/vendor/vendorManage',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "vendorManage" */ '@/pages/vendor/vendorManage/VendorManage'
            )
        ),
      },
    ],
  },
  {
    name: '物料管理',
    path: '/items',
    children: [
      {
        name: '物料管理',
        path: '/items/itemsManage',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "itemManage" */ '@/pages/items/itemsManage/ItemsManage'
            )
        ),
      },
      {
        name: '物料管理',
        path: '/items/itemsAudit',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "itemsAudit" */ '@/pages/items/itemsAudit/ItemsAudit'
            )
        ),
      },
    ],
  },
];

export default routes;
