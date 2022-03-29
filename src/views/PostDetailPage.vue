<template>
  <div class="post-detail-page">
    <article>
      <img v-if="post?.image" :src="post?.image" class="my-4 banner" />
      <h2 class="text-center">{{ post?.title }}</h2>
      <div v-html="content" class="markdown-container"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { FETCH_POST_ACTION } from "@/utils/constant";
import { render } from "@/utils/function";
import { PostProps } from "@/utils/props";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const store = useStore();

const currentId = +useRoute().params.id;

const post = computed<PostProps>(() => store.getters.getPostById(currentId));

onMounted(() => {
  if (!post.value) {
    store.dispatch(FETCH_POST_ACTION, currentId);
  }
});

const content = computed(() => render(post.value?.content || ""));
</script>

<style>
.banner {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
.markdown-container img {
  height: 200px;
  width: 100%;
  object-fit: contain;
}
</style>
