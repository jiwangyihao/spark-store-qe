import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'download', component: () => import('pages/DownloadPage.vue') },
      //下载地址（软件本体）
      {
        path: 'download_latest',
        redirect: 'download',
        beforeEnter() {
          window.open(
            'https://gitee.com/deepin-community-store/spark-store/releases/latest',
          );
        },
      },
      //下载地址（依赖包）
      {
        path: 'download_dependencies_latest',
        redirect: 'download',
        beforeEnter() {
          window.open(
            'https://zunyun01.store.deepinos.org.cn/spark-store-dependencies-kylin.zip',
          );
        },
      },
      {
        path: 'forum',
        redirect: 'about',
        beforeEnter() {
          location.href = 'https://www.deepinos.org/';
        },
      },
      {
        path: 'feedback',
        redirect: 'about',
        beforeEnter() {
          location.href = 'https://www.deepinos.org/';
        },
      },
      {
        path: 'blog',
        redirect: 'about',
        beforeEnter() {
          location.href = 'https://www.deepinos.org/';
        },
      },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      {
        path: 'store',
        component: () => import('pages/StorePage.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/store/RecommendPage.vue'),
          },
          { path: 'rank', component: () => import('pages/store/RankPage.vue') },
          {
            path: 'sort/:sort',
            component: () => import('pages/store/SortPage.vue'),
          },
          {
            path: 'application/:appId',
            component: () => import('pages/store/ApplicationPage.vue'),
          },
        ],
      },
      { path: 'Error404', component: () => import('pages/ErrorPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: '/:catchAll(.*)*', redirect: 'Error404' },
];

export default routes;
