<template>
  <BackgroundComponent>
    <validate-form @form-submit="onFormSubmit">
      <validate-input
        :rules="nameRules"
        v-model="formData.name"
        type="text"
        label="请输入昵称"
      />

      <validate-input
        :rules="emailRules"
        @format="formatCheck"
        v-model="formData.email"
        type="text"
        label="请输入邮箱地址"
      />

      <validate-input
        :rules="passwordRules"
        type="password"
        label="请输入密码"
        v-model="formData.password"
      />
      <MDBRow class="d-flex justify-content-between">
        <MDBCol>
          <ValidateInput
            v-model="formData.authCode"
            :rules="authCodeRules"
            type="text"
            label="请输入验证码"
          ></ValidateInput>
        </MDBCol>
        <MDBCol>
          <button
            @click.prevent="onGetAuthCode"
            type="button"
            class="btn btn-primary"
            :disabled="formData.isRightEmail"
          >
            获取验证码
          </button></MDBCol
        >
      </MDBRow>

      <template #submit>
        <button type="submit" class="btn btn-primary w-100">注册新用户</button>
      </template>
    </validate-form>
  </BackgroundComponent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { MDBRow, MDBCol } from "mdb-vue-ui-kit";

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
import BackgroundComponent from "@/components/BackgroundComponent.vue";

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
