<script setup lang="ts"></script>

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
