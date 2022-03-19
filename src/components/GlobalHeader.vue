<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
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
          <drop-down-item disabled
            ><li>
              <a class="dropdown-item" href="#">退出登录</a>
            </li></drop-down-item
          >
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";

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
</script>
