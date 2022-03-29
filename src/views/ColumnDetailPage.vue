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
import { computed, onMounted } from "vue";
import { FETCH_COLUMNS_ACTION, FETCH_POSTS_ACTION } from "@/utils/constant";

const store = useStore();

const currentId = +useRoute().params.id;

const column = computed(() => store.getters.getColumnById(currentId));
const list = computed(() => store.getters.getPostsByColummnId(currentId));

onMounted(() => {
  if (!column.value) {
    store.dispatch(FETCH_COLUMNS_ACTION);
  }
  store.dispatch(FETCH_POSTS_ACTION, currentId);
});
</script>
