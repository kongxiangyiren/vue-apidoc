<template>
  <div class="interface">
    <div class="container lg:px-10 <sm:px-2 mx-auto" v-if="Interface">
      <div class="py-5 bg-light-blue-500 rounded-lg text-center text-white">
        <Gift class="w-10 text-light-blue-200" />
        <div class="title mt-1 font-bold text-2xl">{{ Interface.api名称 }}</div>
        <div class="desc mt-1 text-sm">{{ Interface.api介绍 }}</div>
      </div>

      <div class="rounded-lg bg-white mt-8">
        <div class="header rounded-t-lg px-5 py-3 bg-light-200">
          接口详情
          <span class="text-sm text-gray-500">{{ Interface.api名称 }}</span>
        </div>
        <div class="markdown-body rounded-b-md p-10 <sm:px-2" v-html="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Gift } from '@vicons/fa';

  import { useRoute, useRouter } from 'vue-router';
  import { getInterface, getAPI } from '@/api/api';
  import { ref } from 'vue';
  import { getHljs, mdParse } from '@/plugins/markdown';
  const $route = useRoute(),
    $router = useRouter();

  if (!$route.query.id || isNaN(Number($route.query.id))) {
    $router.replace('/404');
  } else {
    getIf();
  }

  const Interface = ref<Record<string, string>>(),
    content = ref('');
  async function getIf() {
    const res = await getInterface(Number($route.query.id));

    if (!res) {
      return $router.replace('/404');
    }
    Interface.value = res;

    if (!res.mdPath) {
      return $router.replace('/404');
    }

    const { data } = await getAPI(res.mdPath).catch(err => err);

    if (!data) {
      return $router.replace('/404');
    }
    if (!import.meta.env.DEV) {
      const reg = new RegExp('https://api.kongxiangyiren.top', 'g');
      const data2 = data.replace(reg, location.origin);
      content.value = mdParse(data2);
    } else {
      content.value = mdParse(data);
    }

    getHljs();
  }
</script>

<style scoped lang="scss"></style>
