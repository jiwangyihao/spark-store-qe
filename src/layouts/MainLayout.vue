<template>
  <q-layout view="lhr lpR fFf">
    <header>
      <q-toolbar style="height: 10vmin">
        <q-toolbar-title>
          <q-avatar>
            <img src="icons/favicon-128x128.png">
          </q-avatar>
          星火应用商店
        </q-toolbar-title>
        <q-space />
        <q-tabs
          shrink
          class="text-black"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
        >
          <q-route-tab to="/" label="首页" :ripple="false" />
          <q-route-tab to="/download" label="下载" :ripple="false" />
          <q-route-tab to="/feedback" label="反馈" :ripple="false" />
          <q-route-tab to="/blog" label="博客" :ripple="false" />
          <q-route-tab to="/about" label="关于" :ripple="false" />
        </q-tabs>
      </q-toolbar>
    </header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {  },
  data () {
    return {
      part: "index"
    }
  }
}
</script>