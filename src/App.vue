<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created: function() {
    window.Vue=this
  }
}
</script>
