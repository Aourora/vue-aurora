<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar
      class="header-container"
      expand="lg"
      dark
      bg="dark"
      container
      position="sticky"
    >
      <MDBNavbarToggler target="#navbarExample01"></MDBNavbarToggler>
      <MDBNavbarNav collapse="navbarExample01" class="mb-2 mb-lg-0">
        <MDBNavbarItem to="/" active> 首页 </MDBNavbarItem>
        <MDBNavbarItem to="#"> 游戏 </MDBNavbarItem>
        <MDBNavbarItem to="#"> 算法 </MDBNavbarItem>
        <MDBNavbarItem to="#"> 前端 </MDBNavbarItem>
      </MDBNavbarNav>
      <div class="d-flex w-50 justify-content-around">
        <form class="d-flex input-group w-auto h-100 my-2">
          <input
            type="search"
            class="form-control"
            placeholder="查找文章"
            aria-label="Search"
          />
          <MDBBtn color="light" outline="success"> Search </MDBBtn>
        </form>
        <div v-if="!user.isLogin" class="h-100 my-2">
          <MDBBtn
            @click="onLink('/login')"
            color="light"
            outline="success"
            class="h-100"
          >
            login
          </MDBBtn>

          <MDBBtn
            @click="onLink('/signup')"
            color="light"
            outline="success"
            class="me-2"
          >
            sign up
          </MDBBtn>
        </div>
        <MDBDropdown v-else class="nav-item" align="end" v-model="dropdown">
          <MDBDropdownToggle
            tag="a"
            class="nav-link"
            @click="dropdown = !dropdown"
            ><img
              src="https://mdbootstrap.com/img/Photos/Avatars/img (31).webp"
              class="rounded-circle"
              height="30"
              alt=""
              loading="lazy"
            />
          </MDBDropdownToggle>
          <MDBDropdownMenu light class="text-center">
            <MDBDropdownItem v-if="isAdmin" to="createColumn"
              >新建专栏</MDBDropdownItem
            >
            <MDBDropdownItem to="createPost">新建文章</MDBDropdownItem>
            <MDBDropdownItem tag="button">修改资料</MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem @click="onLogout" tag="button"
              >退出登录</MDBDropdownItem
            >
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    </MDBNavbar>
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { LOGOUT_ACTION } from "@/utils/constant";
import { computed } from "@vue/reactivity";
import { defineProps, PropType } from "vue";
import { useRouter } from "vue-router";

import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-vue-ui-kit";

import { ref } from "vue";

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

defineProps({
  user: { type: Object as PropType<UserProps>, required: true },
});

const router = useRouter();

const onLink = (url: string): void => {
  router.push(url);
};

const store = useStore();

const dropdown = ref(false);

const isAdmin = computed(() => store.state.user.role === "admin");

const onLogout = () => {
  store.dispatch(LOGOUT_ACTION).then(() => {
    router.push("/");
  });
};
</script>

<style>
.header-container {
  height: 80px;
}
</style>
