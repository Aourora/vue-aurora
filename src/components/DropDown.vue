<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2"
      @click.prevent="toggleOpen"
      >{{ text }}</a
    >
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton1"
      :style="{ display: 'block' }"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import useClickOutside from "../hooks/useClickOutside";

defineProps({
  text: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);
const dropdownRef = ref<null | HTMLElement>(null);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const isClickOutside = useClickOutside(dropdownRef);

watch(isClickOutside, () => {
  if (isOpen.value && isClickOutside.value) {
    isOpen.value = false;
  }
});
</script>
