/**
* @author kun
* 2018-7-11
*/

import Layout from '../views/layout/Layout';
import AppMain from '../views/layout/components/AppMain';

const _import = require('./_import_' + process.env.NODE_ENV); /* eslint-disable-line */

const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
];

const asyncRouterMap = [
  { path: '/404', component: _import('dashboard/index'), hidden: true },
  { path: '/error', component: _import('dashboard/index'), hidden: true },
  { path: '*', redirect: '/404' },
  { path: '', redirect: '/dashboard/index' },
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'index',
        component: _import('dashboard/index'),
        meta: {
          title: '首页',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/system-management',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'manger-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '后台管理员',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/distribution-management',
    component: Layout,
    meta: {
      title: '配送管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'distribution-center',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '调度中心',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'station-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '站长管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'deliver-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '配送员管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'transport-order-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '运单管理',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/order-management',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'goods-order',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '商城订单',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'takout-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '外卖订单',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/check-management',
    component: Layout,
    meta: {
      title: '审核管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'seller-takeouts-check',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '外卖商家审核',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'seller-goods-check',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '商城商家审核',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'deliver-check',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '骑手审核',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'product-check',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '商品审核',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/member-management',
    component: Layout,
    meta: {
      title: '会员管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'goods-order',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '消费者管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'takout-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '外卖商家管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'takout-management',
        component: _import('system-management/user-management/index'),
        meta: {
          title: '商城商家管理',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/product',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'el-icon-date',
      // roles: ['admin'],
    },
    children: [
      {
        path: '/classify',
        component: AppMain,
        meta: {
          title: '分类管理',
          icon: 'el-icon-date',
          hasThird: true,
        },
        children: [
          {
            path: 'mall-classify',
            component: _import('product/catalog/index'),
            meta: {
              title: '商城分类管理',
              noCache: true,
            },
          },
        ],
      },
      {
        path: 'spu',
        component: _import('product/spu/index'),
        meta: {
          title: '商品列表',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'spu/add-edit-spu',
        component: _import('product/spu/add-edit-spu/index'),
        hidden: true,
        meta: {
          title: '新增商品',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'catalog',
        component: _import('product/catalog/index'),
        meta: {
          title: '商品分类',
          icon: 'el-icon-date',
        },
      },
    ],
  },
  {
    path: '/bus-management',
    component: Layout,
    meta: {
      title: '运营管理',
      icon: 'el-icon-date',
    },
    children: [
      {
        path: 'ad-management',
        component: _import('bus-management/ad-management'),
        meta: {
          title: '广告管理',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'mess-management',
        component: _import('bus-management/ad-management'),
        meta: {
          title: '消息管理',
          icon: 'el-icon-date',
        },
      },
    ],
  },
];

export { constantRouterMap, asyncRouterMap };
