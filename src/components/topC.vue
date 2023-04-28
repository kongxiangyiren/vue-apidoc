<template>
  <div class="top h-15 mb-8">
    <div class="nav z-50 fixed top-0 left-0 right-0 h-15 bg-white shadow-sm">
      <div class="container lg:px-10 <sm:px-2 mx-auto h-[100%] flex items-center justify-between">
        <div class="text-xl font-bold">
          <router-link to="/">空巷API</router-link>
        </div>

        <div class="right flex items-center">
          <router-link class="mr-5 text-gray-500" to="/about">关于本站</router-link>
          <a href="https://github.com/kongxiangyiren" target="_blank" rel="noopener noreferrer">
            <button
              class="bg-gray-200 hover:bg-gray-300 px-3 py-1 font-mono rounded-sm flex items-center"
            >
              <GithubAlt class="w-4" />
              &nbsp;Github
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GithubAlt } from '@vicons/fa';
</script>

<style scoped lang="scss"></style>
