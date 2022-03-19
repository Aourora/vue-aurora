<template>
  <form class="validate-form-container">
    <slot />
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import emitter from "@/mitt";
import { defineEmits, onUnmounted } from "vue";
const emits = defineEmits(["form-submit"]);

const funcArr: (() => boolean)[] = [];

const callback = (func: () => boolean) => {
  funcArr.push(func);
};
emitter.on("form-item-created", callback);
onUnmounted(() => {
  emitter.off("form-item-created", callback);
  funcArr.length = 0;
});

const submitForm = () => {
  let result = true;
  funcArr.forEach((func) => {
    result = func() && result;
  });
  emits("form-submit", result);
};
</script>
