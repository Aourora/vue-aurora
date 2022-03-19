<template>
  <login-component :onFormSubmit="onFormSubmit">
    <div>
      <span><h1 class="text-center">注册页面</h1></span>
    </div>
    <template #code>
      <div class="mb-3">
        <label for="form-label">验证码</label>
        <ValidateInput
          v-model="authCodeValue"
          type="text"
          placeholder="请输入验证码"
        ></ValidateInput>
        <button
          @click.prevent="onGetAuthCode"
          type="button"
          class="btn btn-primary"
        >
          获取验证码
        </button>
      </div>
    </template>
  </login-component>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import axios from "axios";
import { encryptData, hashSHA256 } from "@/utils/function";
import LoginComponent from "@/components/LoginComponent.vue";
import ValidateInput from "@/components/ValidateInput.vue";
import { ref } from "vue";

const router = useRouter();

const authCodeValue = ref("");

const onGetAuthCode = async () => {
  const result = await axios.post("auth-code", { email: "1952153185@qq.com" });
  alert(result);
};

const onFormSubmit = async (
  format: boolean,
  email: string,
  password: string
) => {
  if (format) {
    //rsa加密
    //rsa加密
    const pwd = hashSHA256(hashSHA256(password) + email);
    const source = {
      email,
      pwd,
      time: Date.now().toString(),
      code: authCodeValue.value,
    };

    const result = await axios.post("auth/register", encryptData(source));
    const { code, message } = result.data;
    if (code === "0") {
      router.push("/login");
    } else {
      alert(message);
    }
  }
};
</script>
