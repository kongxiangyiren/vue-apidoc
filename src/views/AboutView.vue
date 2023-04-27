<template>
  <div class="container rounded-md mx-auto bg-white">
    <div class="markdown-body rounded-md p-10 lg:px-10 <sm:px-2" v-html="content" />
  </div>
</template>

<script setup lang="ts">
  import { mdParse, getHljs } from '@/plugins/markdown';

  import { ref } from 'vue';
  import { getAbout } from '@/api/api';

  const content = ref();
  async function getcfg() {
    const { data: res } = await getAbout().catch(err => err);
    if (!res) {
      return;
    }

    content.value = await mdParse(typeof res === 'string' ? res : '');
    // 代码高亮
    getHljs();
  }

  getcfg();
</script>

<style scoped lang="scss"></style>
