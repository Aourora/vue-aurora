<template>
  <div class="post-detail-page">
    <article>
      <img v-if="post.image" :src="post.image" class="my-4" />
      <h2 class="text-center">{{ post.title }}</h2>
      <div v-html="content"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { render } from "@/utils/function";
import { computed, defineProps, PropType } from "vue";

const props = defineProps({
  post: {
    type: Object as PropType<{ image: string; title: string; content: string }>,
    required: true,
  },
});

const content = computed(() => render(props.post.content));
</script>

<style>
.post-detail-page img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
