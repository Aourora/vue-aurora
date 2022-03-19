<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-tenter">
        <img
          :src="column?.avatar"
          :alt="column?.title"
          class="rounded-circle border border-light w-100 my-3"
        />
      </div>
      <div class="col-9">
        <h4>{{ column?.title }}</h4>
        <p class="text-muted">{{ column?.description }}</p>
      </div>
    </div>
    <PostList :list="list"></PostList>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import { useStore } from "@/store";

const store = useStore();

const currentId = useRoute().params.id;
const column = store.getters.getColumnById(+currentId);
const list = store.getters.getPostByColummnId(column.id);
</script>
