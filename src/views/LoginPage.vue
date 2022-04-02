<template>
  <background-component>
    <div class="">
      <validate-form @form-submit="onFormSubmit">
        <validate-input
          :rules="emailRules"
          v-model="email"
          type="text"
          label="请输入邮箱地址"
        />

        <validate-input
          :rules="passwordRules"
          type="password"
          label="请输入密码"
          v-model="password"
        />
        <template #submit>
          <button type="submit" class="btn btn-primary w-100">登录</button>
        </template>
      </validate-form>
    </div>
  </background-component>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useStore } from "@/store";
import { useRouter } from "vue-router";

import { LOGIN_ACTION } from "@/utils/constant";
import { encryptData, hashSHA256 } from "@/utils/function";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "@/components/ValidateInput.vue";
import { emailRules, passwordRules } from "../utils/constant";
import useMessageInfo from "@/hooks/useMessageInfo";
import BackgroundComponent from "@/components/BackgroundComponent.vue";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const onFormSubmit = async (format: boolean) => {
  if (format) {
    //rsa加密
    const pwd = hashSHA256(hashSHA256(password.value) + email.value);
    const source = { email: email.value, pwd, time: Date.now().toString() };

    store
      .dispatch(LOGIN_ACTION, await encryptData(source))
      .then(() => {
        useMessageInfo("success", "登录成功，正在跳转首页...", 2000);
        router.push("/");
      })
      .catch(({ data }) => {
        console.log(data);
      });
  }
};
</script>

<style></style>
