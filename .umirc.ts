import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  scripts: [{src: '/sw-registrator.js'}],
  metas: [{name: '个人测试运营后台'}],
  layout: {
    title: '个人测试运营后台',
  },
  copy: [
    { from: './sw-registrator.js', to: 'dist/sw-registrator.js' },
    { from: './sw.js', to: 'dist/sw.js' }
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

