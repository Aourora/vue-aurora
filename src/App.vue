<template>
  <MDBContainer fluid class="px-0" style="background-color: #e0e0e0">
    <!-- <loader-component v-if="isLoading" text="拼命加载中"></loader-component> -->
    <message-component
      v-if="message.status"
      :type="message.type"
      :message="message.message"
    ></message-component>
    <global-header :user="userData">
      <router-view class="content-container"></router-view>
      <global-footer></global-footer>
    </global-header>
  </MDBContainer>
</template>

<script setup lang="ts">
import "mdb-vue-ui-kit/css/mdb.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import { useStore } from "./store";
import { computed } from "vue";
// import LoaderComponent from "./components/LoaderComponent.vue";
import MessageComponent from "./components/MessageComponent.vue";

import { MDBContainer } from "mdb-vue-ui-kit";

const store = useStore();

// const isLoading = computed(() => store.state.loading);

const message = computed(() => store.state.message);

const userData = computed(() => store.state.user);
</script>

<!-- <style>
.background {
  background-image: url("https://static001.geekbang.org/static/account/img/home-time-bg-day.a873036f.png");
  width: 100rem;
  height: 100rem;
  background-size: 100% 100%; /* ---按容器比例撑满，图片变形；*/
  background-attachment: fixed; /* 当内容高度大于图片高度时，背景图像的位置相对于 可视窗口 固定，此条属性必须设置 */
}
</style> -->

<style>
.content-container {
  min-height: calc(100vh - 232px);
}
</style>
