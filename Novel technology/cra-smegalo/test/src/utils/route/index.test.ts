import { Routes } from '@/pages/XRouter/route';
import { getRoutePath } from './index';

const routes: Routes[] = [
  {
    name: '业财服务配置',
    path: '/businessFinance',
    children: [
      {
        name: '凭证转换规则',
        path: '/voucher',
      },
      {
        name: '渠道银存科目配置',
        path: '/bankDeposit',
      },
    ],
  },
  {
    name: '凭证管理',
    path: '/voucherManage',
    children: [
      {
        name: '凭证汇总查询',
        path: '/summary',
      },
    ],
  },
];

const routes2 = [
  {
    name: '业财服务配置',
    path: '/b',
  },
  {
    name: '业财服务配置',
    path: '/a',
    children: [
      {
        name: '凭证转换规则',
        path: '/a1',
      },
      {
        name: '渠道银存科目配置',
        path: '/a2',
      },
    ],
  },
];

describe('获取路由配置的第一个完成路径', () => {
  it('获取路由的第一个', () => {
    expect(getRoutePath(routes)).toBe('/businessFinance/voucher');
  });

  it('不包含children的数据', () => {
    expect(getRoutePath(routes2)).toBe('/b');
  });
});
