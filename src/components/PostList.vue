<template>
  <div class="post-list">
    <article v-for="post in list" :key="post.id" class="card mb-3">
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 algin-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image" :alt="post.title" class="rounded-lg" />
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.content }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { PostProps } from "@/utils/props";
import { defineProps, PropType } from "vue";
defineProps({
  list: { type: Array as PropType<PostProps[]>, required: true },
});
</script>
