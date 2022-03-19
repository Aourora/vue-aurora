<template>
  <login-component :onFormSubmit="onFormSubmit">
    <div>
      <span><h1 class="text-center">登录页面</h1></span>
    </div></login-component
  >
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { useRouter } from "vue-router";

import axios from "axios";
import { LOGIN_ACTION } from "@/utils/constant";
import { encryptData, hashSHA256 } from "@/utils/function";
import LoginComponent from "@/components/LoginComponent.vue";

const store = useStore();
const router = useRouter();

const onFormSubmit = async (
  format: boolean,
  email: string,
  password: string
) => {
  if (format) {
    //rsa加密
    const pwd = hashSHA256(hashSHA256(password) + email);
    const source = { email, pwd, time: Date.now().toString() };

    const result = await axios.post("auth/login", encryptData(source));
    const { code, message, data } = result.data;
    if (code === "0") {
      await store.dispatch(LOGIN_ACTION, {
        id: data.id,
        isLogin: true,
        name: data.name,
      });
      router.push("/");
    } else {
      alert(message);
    }
  }
};
</script>
