<script setup>
import { useMeta } from "quasar";

useMeta({
  title: "WEB商店",
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: (title) => `${title} - 星火应用商店`,
});
</script>

<template>
  <q-page class="flex storePage">
    <!--<div class="topBar">
      <div class="search">
        <q-icon name="search" size="25px" />
        <q-input borderless v-model="searchStr">
          <template v-slot:append>
            <q-icon v-if="searchStr !== ''" name="clear" class="cursor-pointer" @click="searchStr = ''" />
          </template>
        </q-input>
      </div>
    </div>-->
    <!--suppress JSValidateTypes -->
    <q-scroll-area
      style="width: 100%"
      :thumb-style="{ 'z-index': 2, 'border-radius': '100px' }"
      :visible="false"
    >
      <router-view></router-view>
    </q-scroll-area>
  </q-page>
</template>

<style scoped lang="scss">
.storePage {
  padding-top: 30px;
  padding-left: 60px;
  overflow-y: unset;

  &::before {
    content: "";
    width: 100%;
    height: 120px;
    position: absolute;
    top: 0;
    z-index: 1;
    background: linear-gradient(#fff 36%, #0000);
    pointer-events: none;
  }
}

.storePage .topBar {
  position: fixed;
  width: 100%;
  height: 20vmin;
  background: linear-gradient(white 36%, rgba(0, 0, 0, 0));
  pointer-events: none;
  z-index: 1;
}
.storePage .topBar .search {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.08), 0 32px 64px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 13px;
  left: 52px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row-reverse;
  transition-property: width, box-shadow;
  transition-duration: 0.5s;
  pointer-events: auto;
}
.storePage .topBar .search:hover {
  width: 324px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06), 0 2px 2px rgba(0, 0, 0, 0.06),
    0 4px 4px rgba(0, 0, 0, 0.06), 0 6px 8px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 0, 0, 0.06);
}
.storePage .topBar .search .q-icon {
  color: gray;
  transition: all 0.5s;
  margin: 12px;
}
.storePage .topBar .search:hover .q-icon {
  color: var(--q-primary);
}
.storePage .topBar .search .q-field {
  opacity: 0;
  transition: all 0.5s;
}
.storePage .topBar .search:hover .q-field {
  opacity: 1;
  flex-grow: 1;
  margin-left: 4vmin;
}
</style>
