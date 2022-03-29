<template>
  <teleport to="#back">
    <div
      class="d-flex align-items-center justify-content-center h-100 loading-containter"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="text-center">
        <div
          class="spinner-border text-primary text-center"
          role="status"
        ></div>
        <p v-if="text" class="small text-primary">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>
>

<script setup lang="ts">
import useDOMCreate from "@/hooks/useDOMCreate";
import { defineProps } from "vue";

useDOMCreate("div", "back");

defineProps({
  text: String,
  background: String,
});
</script>

<style>
.loading-containter {
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
