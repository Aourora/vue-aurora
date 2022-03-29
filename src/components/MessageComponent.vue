<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top mx-auto d-flex justify-content-between mt-2"
      :class="{
        'alert-success': type === 'success',
        'alert-danger': type === 'error',
        'alert-primary': type === 'default',
      }"
      role="alert"
    >
      <!-- <svg
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Info:"
      >
        <use xlink:href="#info-fill" />
      </svg> -->
      <div>{{ message }}</div>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click.prevent="hideMessage"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>
>

<script setup lang="ts">
import useDOMCreate from "@/hooks/useDOMCreate";
import { useStore } from "@/store";
import { HIDE_MESSAGE } from "@/utils/constant";
import { MessageType } from "@/utils/props";
import { defineProps, PropType } from "vue";

useDOMCreate("div", "message");

defineProps({
  type: { type: String as PropType<MessageType>, default: "default" },
  message: String,
});
const store = useStore();

const hideMessage = () => {
  store.commit(HIDE_MESSAGE);
};
</script>

<style>
.message-info {
  width: 30%;
}
.close {
  background-color: inherit;
  border: 0;
}
</style>
