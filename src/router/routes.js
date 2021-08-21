
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/download', component: () => import('pages/Download.vue') },
      { path: '/fourm', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: '/feedback', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: '/blog', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/store', component: () => import('pages/Store.vue')},
      { path: '/store/rank', component: () => import('pages/Store.vue')},
      { path: '/store/sorts/:sort', component: () => import('pages/Store.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
