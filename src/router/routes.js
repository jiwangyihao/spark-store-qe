
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'download', component: () => import('pages/Download.vue') },
      { path: 'download_latest', beforeEnter() {
        location.href = 'https://gitee.com/deepin-community-store/spark-store/attach_files/945388/download/spark-store_3.0.3-8_amd64.deb'
      } },
      { path: 'download_uos_latest', beforeEnter() {
          location.href = 'https://gitee.com/deepin-community-store/spark-store-uos/releases/3.0.3-7-uos'
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
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
