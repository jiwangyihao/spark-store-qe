<template>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  created: function() {
    window.Vue=this
  }
}
</script>
