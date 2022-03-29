<template>
  <CreateComponent :up-loaded-success="onUploadSuccess">
    <template #form>
      <h4>新建专栏</h4>
      <ValidateForm @form-submit="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">专栏标题：</label>
          <ValidateInput
            v-model="formData.title"
            type="text"
            placeholder="请输入专栏标题"
            :rules="titleRules"
          ></ValidateInput>
        </div>
        <div class="mb-3">
          <label class="form-label">专栏简介：</label>
          <ValidateInput
            v-model="formData.description"
            type="text"
            :tag="'textarea'"
            rows="15"
            placeholder="请输入专栏简介"
            :rules="conentRules"
          ></ValidateInput>
        </div>
        <template #submit>
          <button class="btn btn-primary btn-large">创建专栏</button>
        </template>
      </ValidateForm>
    </template>
  </CreateComponent>
</template>

<script setup lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput from "@/components/ValidateInput.vue";
import { useStore } from "@/store";
import { CRESTE_CLOUMN_ACTION } from "@/utils/constant";
import { RuleProps } from "@/utils/props";
import { reactive } from "vue";
import CreateComponent from "@/components/CreateComponent.vue";
import { useRouter } from "vue-router";
import useMessageInfo from "@/hooks/useMessageInfo";

const titleRules: RuleProps[] = [
  { type: "required", message: "专栏标题不能为空" },
];
const conentRules: RuleProps[] = [
  { type: "required", message: "专栏简介不能为空" },
];

const formData = reactive<{
  title: string;
  description: string;
  avatar: string;
}>({ title: "", description: "", avatar: "" });

const onUploadSuccess = (url: string): void => {
  formData.avatar = url;
};

const store = useStore();
const router = useRouter();

const onFormSubmit = (result: boolean) => {
  if (result) {
    const columnData = {
      title: formData.title,
      avatar: formData.avatar,
      description: formData.description,
      author: store.state.user.id,
    };
    store
      .dispatch(CRESTE_CLOUMN_ACTION, columnData)
      .then((result) => {
        //创建专栏成功，2s后跳转至专栏页
        useMessageInfo("success", "创建专栏成功，2s后跳转至专栏页", 2000);
        setTimeout(() => {
          router.push("/detail/" + result.data);
        }, 2000);
      })
      .catch(() => {
        //创建专栏失败
        useMessageInfo("error", "创建专栏失败");
      });
  }
};
</script>
