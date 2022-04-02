<template>
  <ColumnList :list="columnList" />
</template>
<script setup lang="ts">
import ColumnList from "@/components/ColumnList.vue";
import { useStore } from "@/store";
import { FETCH_COLUMNS_ACTION } from "@/utils/constant";
import { computed, onMounted } from "vue";

const store = useStore();

onMounted(() => {
  store.dispatch(FETCH_COLUMNS_ACTION);
});

const columnList = computed(() => store.state.columnList);
</script>
