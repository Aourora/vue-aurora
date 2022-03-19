<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          v-model="titleValue"
          type="text"
          placeholder="请输入文章标题"
          :rules="titleRules"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInput
          v-model="contentValue"
          type="text"
          :tag="'textarea'"
          rows="15"
          placeholder="请输入文章详情"
          :rules="conentRules"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">发表专栏</label>
        <select class="form-select" v-model="selectId">
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
  </div>
</template>

<script setup lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RuleProp } from "@/components/ValidateInput.vue";
import { useStore } from "@/store";
import axios from "axios";
import { CRESTE_POST_ACTION } from "@/utils/constant";
import { PostProps } from "@/utils/props";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const titleRules: RuleProp[] = [
  { type: "required", message: "文章标题不能为空" },
];
const conentRules: RuleProp[] = [
  { type: "required", message: "文章内容不能为空" },
];

const titleValue = ref("");

const contentValue = ref("");

const store = useStore();
const router = useRouter();

const columnList = computed(() => store.state.columnList);
const selectId = ref(columnList.value[0].id);

const onFormSubmit = async (result: boolean) => {
  axios.get("auth/current");
  if (result) {
    const postData: PostProps = {
      id: new Date().getTime(),
      title: titleValue.value,
      content: contentValue.value,
      createdAt: new Date().toLocaleString(),
      columnId: selectId.value,
    };
    await store.dispatch(CRESTE_POST_ACTION, postData);
    router.push(`/detail/${selectId.value}`);
  }
};
</script>
