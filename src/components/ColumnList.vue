<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm" style="width: 18rem">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            class="rounded-circle border border-light w-25 my-3"
            :alt="column.title"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">
            {{ column.description }}
          </p>
          <router-link
            :to="`/Detail/${column.id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColumnProps } from "@/utils/props";
import { computed, defineProps, PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
});

const columnList = computed(() => {
  return props.list.map((cloumn) => {
    if (!cloumn.avatar) {
      cloumn.avatar = require("@/assets/column.png");
    }
    return cloumn;
  });
});
</script>
