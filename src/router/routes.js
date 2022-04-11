
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'download', component: () => import('pages/Download.vue') },
      //下载地址（软件本体）
      { path: 'download_latest', beforeEnter() {
        window.open('https://gitee.com/deepin-community-store/spark-store/attach_files/1023491/download/spark-store_3.0.3-11_amd64.deb')
      } },
      //下载地址（依赖包）
      { path: 'download_dependencies_latest', beforeEnter() {
          window.open('https://d.store.deepinos.org.cn/spark-store-dependencies-kylin.zip')
        } },
      { path: 'forum', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: 'feedback', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: 'blog', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: 'about', component: () => import('pages/About.vue') },
      {
        path: 'store',
        component: () => import('pages/Store.vue'),
        children: [
          { path: 'rank', component: () => import('pages/Store.vue')},
          { path: 'sorts/:sort', component: () => import('pages/Store.vue')},
          { path: 'application/:appId', component: () => import('pages/Store.vue')}
        ]
      },
      { path: 'Error404', component: () => import('pages/Error404.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: '/:catchAll(.*)*', redirect: 'Error404' }
]

export default routes
