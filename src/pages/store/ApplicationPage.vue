<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useStore } from 'stores/store';

const store = useStore();

onUnmounted(() => {
  if (store.sortCache.activeCard) {
    store.cancelActiveCard();
  }
});
</script>

<template>
  <div class="application-container"></div>
</template>

<style scoped lang="scss">
.application-container {
  &.store-enter-active,
  &.store-leave-active {
    transition:
      opacity 2s ease,
      transform 2s ease;
  }

  &.store-enter-from,
  &.store-leave-to {
    opacity: 0;
  }
}
</style>
