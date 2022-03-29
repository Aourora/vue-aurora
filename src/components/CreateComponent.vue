<template>
  <div class="create-page">
    <UploaderComponent
      :before-upload="uploadCheck"
      @file-upload-success="upLoadedSuccess"
      action="upload"
      class="upload-container d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传图片</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #success="dataProps"> <img :src="dataProps.url" /></template>
    </UploaderComponent>
    <slot name="form"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import UploaderComponent from "@/components/UploaderComponent.vue";

import { beforeUploadCheck } from "@/utils/function";
import useMessageInfo from "@/hooks/useMessageInfo";

defineProps({
  upLoadedSuccess: Function as PropType<(url: string) => void>,
});

const uploadCheck = (file: File): boolean => {
  const result = beforeUploadCheck(file, {
    format: ["image/png", "image/jpeg"],
    size: 1,
  });
  if (!result.passed) {
    if (result.error === "format") {
      useMessageInfo("error", "只能上传jpg/png格式图片!");
    } else {
      useMessageInfo("error", "上传图片大小不能超过 1Mb!");
    }
  }
  return result.passed;
};
</script>

<style>
.create-page .upload-container {
  height: 200px;
  cursor: pointer;
}
.create-page .upload-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
