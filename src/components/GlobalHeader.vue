<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between px-4">
    <router-link class="navbar-brand" to="/">Aurora专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link to="/register" class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <drop-down :text="`你好 ${user.name}`">
          <drop-down-item v-if="isAdmin"
            ><li>
              <router-link class="dropdown-item" to="/createColumn"
                >新建专栏</router-link
              >
            </li></drop-down-item
          >
          <drop-down-item
            ><li>
              <router-link class="dropdown-item" to="/createPost"
                >新建文章</router-link
              >
            </li></drop-down-item
          >
          <drop-down-item
            ><li>
              <a class="dropdown-item" href="#">修改资料</a>
            </li></drop-down-item
          >
          <drop-down-item
            ><li>
              <a class="dropdown-item" @click.prevent="onLogout" href="#"
                >退出登录</a
              >
            </li></drop-down-item
          >
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { LOGOUT_ACTION } from "@/utils/constant";
import { computed } from "@vue/reactivity";
import { defineProps, PropType } from "vue";
import { useRouter } from "vue-router";

import DropDown from "./DropDown.vue";
import DropDownItem from "./DropDownItem.vue";

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

defineProps({
  user: { type: Object as PropType<UserProps>, required: true },
});

const router = useRouter();
const store = useStore();

const isAdmin = computed(() => store.state.user.role === "admin");

const onLogout = () => {
  store.dispatch(LOGOUT_ACTION).then(() => {
    router.push("/");
  });
};
</script>
