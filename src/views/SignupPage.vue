<template>
  <div class="d-flex justify-content-center">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="form-label">昵称</label>
        <validate-input
          :rules="nameRules"
          v-model="formData.name"
          type="text"
          placeholder="请输入昵称"
        />
      </div>
      <div class="mb-3">
        <label for="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          @format="formatCheck"
          v-model="formData.email"
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
          v-model="formData.password"
        />
      </div>
      <div class="mb-3">
        <label for="form-label">验证码</label>
        <ValidateInput
          v-model="formData.authCode"
          :rules="authCodeRules"
          type="text"
          placeholder="请输入验证码"
        ></ValidateInput>
        <button
          @click.prevent="onGetAuthCode"
          type="button"
          class="btn btn-primary"
          :disabled="formData.isRightEmail"
        >
          获取验证码
        </button>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary">注册新用户</button>
      </template>
    </validate-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import axios from "axios";
import { reactive } from "vue";

import { encryptData, hashSHA256 } from "@/utils/function";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "@/components/ValidateInput.vue";
import {
  emailRules,
  passwordRules,
  nameRules,
  authCodeRules,
} from "../utils/constant";
import { ResponseData } from "@/utils/props";
import useMessageInfo from "@/hooks/useMessageInfo";

const router = useRouter();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  authCode: "",
  isRightEmail: true,
});

const formatCheck = (result: boolean): void => {
  formData.isRightEmail = !result;
};

const onGetAuthCode = async () => {
  axios
    .post<ResponseData<null>>("auth-code", { email: formData.email })
    .then(({ data }) => {
      useMessageInfo("success", data.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

const onFormSubmit = async (format: boolean) => {
  if (format) {
    //rsa加密
    //rsa加密
    const pwd = hashSHA256(hashSHA256(formData.password) + formData.email);
    const source = {
      name: formData.name,
      email: formData.email,
      pwd,
      time: Date.now().toString(),
      code: formData.authCode,
    };

    axios
      .post<ResponseData<{ id: string }>>(
        "auth/signup",
        await encryptData(source)
      )
      .then(() => {
        useMessageInfo("success", "注册成功，正在跳转登录页...", 2000);
        router.push("/login");
      })
      .catch(({ data }) => {
        console.log(data);
      });
  }
};
</script>
