<template>
  <Top />
  <div class="router pb-8">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import Top from '@/components/topC.vue';
  import { RouterView } from 'vue-router';
</script>

<style scoped lang="scss"></style>
