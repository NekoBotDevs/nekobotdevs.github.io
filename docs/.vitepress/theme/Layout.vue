<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 添加自定义逻辑
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
}
</style>

