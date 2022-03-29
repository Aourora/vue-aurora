<template>
  <div class="d-flex">
    <div class="create-post-page w-50">
      <CreateComponent :up-loaded-success="onUploadSuccess">
        <template #form>
          <h4>新建文章</h4>
          <ValidateForm @form-submit="onFormSubmit">
            <div class="mb-3">
              <label class="form-label">文章标题：</label>
              <ValidateInput
                v-model="formData.title"
                type="text"
                placeholder="请输入文章标题"
                :rules="titleRules"
              ></ValidateInput>
            </div>
            <div class="mb-3">
              <label class="form-label">文章详情：</label>
              <ValidateInput
                v-model="formData.content"
                type="text"
                :tag="'textarea'"
                rows="15"
                placeholder="请输入文章详情"
                :rules="conentRules"
                @paste="onPaste"
                :is-change="true"
              ></ValidateInput>
            </div>
            <div class="mb-3">
              <label class="form-label">发表专栏</label>
              <select class="form-select" v-model="formData.selectId">
                <option
                  v-for="column in columnList"
                  :key="column.id"
                  :value="column.id"
                >
                  {{ column.title }}
                </option>
              </select>
            </div>

            <template #submit>
              <button class="btn btn-primary btn-large">发表文章</button>
            </template>
          </ValidateForm>
        </template>
      </CreateComponent>
    </div>
    <div class="preview-container w-50 bg-light mx-2">
      <PostDetailComponent :post="formData"></PostDetailComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput from "@/components/ValidateInput.vue";
import { useStore } from "@/store";
import { CRESTE_POST_ACTION, FETCH_COLUMNS_ACTION } from "@/utils/constant";
import { RuleProps } from "@/utils/props";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import CreateComponent from "@/components/CreateComponent.vue";
import emitter from "@/mitt";
import PostDetailComponent from "@/components/PostDetailComponent.vue";

const titleRules: RuleProps[] = [
  { type: "required", message: "文章标题不能为空" },
];
const conentRules: RuleProps[] = [
  { type: "required", message: "文章内容不能为空" },
];

const formData = reactive<{
  title: string;
  image: string;
  content: string;
  selectId: number;
}>({
  title: "",
  image: "",
  content: "",
  selectId: 1,
});

const store = useStore();
const router = useRouter();

if (!store.state.columnList || !store.state.columnList.length) {
  store.dispatch(FETCH_COLUMNS_ACTION);
}

const columnList = computed(() => store.state.columnList);

const onPaste = (data: any) => {
  const file = data.clipboardData.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  emitter.emit(
    "change-input-value",
    formData.content + `\n![${file.name}](${url})`
  );
};

const onUploadSuccess = (url: string): void => {
  formData.image = url;
};

const onFormSubmit = async (result: boolean) => {
  if (result) {
    const postData = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.content.slice(0, 100),
      image: formData.image,
      column_id: formData.selectId,
      author: store.state.user.id,
    };
    await store.dispatch(CRESTE_POST_ACTION, postData);
    //------------------------
    router.push(`/columnDetail/${formData.selectId}`);
  }
};
</script>

<style>
.preview-container {
  background-color: antiquewhite;
}

.preview-container img {
  object-fit: contain;
}
</style>
