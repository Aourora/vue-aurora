<template>
  <div class="file-upload">
    <div @click.prevent="onClick" v-bind="$attrs">
      <slot v-if="uploadData.status === 'loading'" name="loading">
        <button class="btn btn-primary btn-sm float-right">正在上传...</button>
      </slot>
      <slot
        v-else-if="uploadData.status === 'success'"
        name="success"
        :url="uploadData.url"
      >
        <button class="btn btn-success btn-sm float-right">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary btn-sm float-right">点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="d-none"
      name="file"
      @change.prevent="loadFile"
    />
  </div>
</template>

<script setup lang="ts">
import { ResponseData, UploaderStatus } from "@/utils/props";
import axios from "axios";
import { reactive, defineProps, defineEmits, PropType, ref } from "vue";

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  beforeUpload: Function as PropType<(file: File) => boolean>,
});

const uploadData = reactive<{
  status: UploaderStatus;
  url: string;
  file: File;
}>({
  status: "ready",
  url: "",
  file: null,
});

const fileInput = ref<HTMLInputElement>(null);

const emits = defineEmits(["file-upload-success", "file-upload-error"]);

const loadFile = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  uploadData.file = null;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    //文件上传前校验
    if (props.beforeUpload && !props.beforeUpload(file)) {
      return;
    }

    uploadData.file = file;

    //上传文件
    uploadData.status = "loading";
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post<ResponseData<{ url: string }>>(props.action, formData)
      .then(({ data }) => {
        emits("file-upload-success", data.data.url);
        uploadData.status = "success";
        uploadData.url = data.data.url;
      })
      .catch((error) => {
        emits("file-upload-error", error);
        uploadData.status = "error";
      })
      .finally(() => {
        fileInput.value.value = "";
      });
  }
};
const onClick = () => {
  if (fileInput.value) {
    //拉起文件选择界面
    fileInput.value.click();
  }
};
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>
