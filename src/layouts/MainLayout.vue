<!--suppress JSUnresolvedVariable, NpmUsedModulesInstalled, CssInvalidFunction, HtmlUnknownTag -->
<script setup>
import Navigation from "../components/Navigation.vue";

function min() {
  electron.min();
}
function max() {
  electron.max();
}
function close() {
  electron.close();
}
</script>

<template>
  <q-layout view="lhr lpR fFf">
    <q-ajax-bar ref="bar" position="top" color="primary" />
    <div v-if="$q.platform.is.electron" class="toolbox">
      <q-btn color="white" padding="xs" icon="minimize" @click="min" />
      <q-btn
        color="white"
        padding="xs"
        icon-right="settings_ethernet"
        @click="max"
      />
      <q-btn color="white" padding="xs" icon="close" @click="close" />
    </div>
    <div v-if="$q.platform.is.electron" class="dragArea"></div>
    <navigation></navigation>
    <q-page-container style="overflow: hidden">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.toolbox {
  height: 40px;
  position: fixed;
  right: 5px;
  top: 10px;
  z-index: 2;
  user-select: none;
  -webkit-user-select: none;

  .q-btn {
    margin: 0 5px;
  }

  .q-btn::before {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 10%), 0 2px 2px rgba(0, 0, 0, 7%),
      0 3px 1px -2px rgba(0, 0, 0, 6%);
  }

  .q-btn--active::before {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 10%), 0 5px 8px rgba(0, 0, 0, 7%),
      0 1px 14px rgba(0, 0, 0, 6%) !important;
  }

  .q-btn i {
    color: gray;
    transition-property: color;
    transition-duration: 0.5s;
    will-change: color;
  }

  .q-btn:hover i {
    color: var(--q-primary);
  }
}
.dragArea {
  position: fixed;
  height: calc(40px + 4vmin);
  width: calc(100vw - 620px);
  left: 480px;
  z-index: 3;
  -webkit-app-region: drag;
}
</style>
