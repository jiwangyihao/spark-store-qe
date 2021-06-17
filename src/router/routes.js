
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/download', component: () => import('pages/Download.vue') },
      { path: '/feedback', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: '/blog', beforeEnter() { location.href = 'https://www.deepinos.org/' } },
      { path: '/about', component: () => import('pages/About.vue') }
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
