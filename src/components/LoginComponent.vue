<template>
  <validate-form @form-submit="onFormSubmit">
    <slot></slot>
    <div class="mb-3">
      <label for="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailValue"
        type="text"
        placeholder="请输入邮箱地址"
      />
    </div>
    <div class="mb-3">
      <label for="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        type="password"
        placeholder="请输入密码"
        v-model="passwordValue"
      />
    </div>
    <slot name="code"></slot>
  </validate-form>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import ValidateForm from "../components/ValidateForm.vue";
import validateInput, { RuleProp } from "../components/ValidateInput.vue";

const emailRules: RuleProp[] = [
  { type: "required", message: "邮箱不能为空" },
  { type: "email", message: "邮箱不合法" },
];
const passwordRules: RuleProp[] = [
  { type: "required", message: "密码不能为空" },
];

const props = defineProps({
  onFormSubmit: {
    type: Function as PropType<
      (params: boolean, email: string, password: string) => Promise<void>
    >,
    required: true,
  },
});
const onFormSubmit = (params: boolean) => {
  props.onFormSubmit(params, emailValue.value, passwordValue.value);
};
const emailValue = ref("");
const passwordValue = ref("");
</script>
