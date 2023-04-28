<template>
  <div class="container lg:px-10 <sm:px-2 mx-auto">
    <div class="search py-10 bg-white rounded-lg text-center">
      <div class="title text-3xl font-bold">空巷API</div>
      <div class="text-gray-500 mt-3">空巷API,提供免费、易搭建的API数据接口服务</div>
      <div class="text-gray-500 mt-3">共收录了{{ api ? api.length : 0 }}个接口</div>
      <div class="mt-5 mx-auto max-w-[90%] flex justify-center">
        <input
          type="text"
          placeholder="搜索API"
          v-model="search"
          class="rounded-l-md w-100 border-1px border-[#ccc] p-2 focus:outline-solid-sky-200"
          @keyup.enter="titleSearch"
        />
        <button class="w-12 bg-[#c0e0f1] hover:bg-[#81c2e3] rounded-r-md" @click="titleSearch">
          <Search class="w-4 text-[#666]" />
        </button>
      </div>
    </div>

    <div class="flex flex-wrap" v-if="api && api.length !== 0">
      <div
        class="cursor-pointer rounded-md mt-8 p-5 w-[100%] md:w-[calc(50%-3rem)] md:mx-8 md:even-of-type:ml-0 bg-white hover:bg-gray-50"
        v-for="(item, index) in api"
        :key="index"
        @click="$router.push({ path: '/interface', query: { id: item.id } })"
      >
        <div class="title font-bold">{{ item.api名称 }}</div>
        <div class="desc mt-3 text-gray-400">{{ item.api介绍 }}</div>
      </div>
    </div>
    <div v-else>
      <div class="rounded-md mt-8 p-5 w-[100%] md:mx-8 md:w-[calc(100%-4rem)] bg-white">
        <div class="tite text-center text-2xl font-bold">暂无接口</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Search } from '@vicons/fa';

  import { ref } from 'vue';
  import { apiList, getSearch } from '@/api/api';
  const search = ref('');
  const api = ref<
    Array<{
      id: number;
      api名称: string;
      api介绍: string;
    }>
  >([]);
  async function getcfg() {
    const { data: res } = await apiList().catch(err => err);
    if (!res || !res.api) {
      return;
    }
    api.value = res.api;
  }
  getcfg();

  // api搜索
  async function titleSearch() {
    const data = await getSearch(search.value);
    api.value = data;
  }
</script>

<style scoped lang="scss"></style>
