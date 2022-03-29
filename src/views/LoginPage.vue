<template>
  <div class="d-flex justify-content-center align-items-center">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="email"
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
          v-model="password"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary">登录</button>
      </template>
    </validate-form>
  </div>
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
