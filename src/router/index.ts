import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
    meta: {
      redirectAleadyAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterPage.vue"),
    meta: {
      redirectAleadyAuth: true,
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () =>
      import(
        /* webpackChunkName: "test" */
        "@/views/ColumnDetailPage.vue"
      ),
  },
  {
    path: "/createPost",
    name: "createPost",
    component: () =>
      import(
        /* webpackChunkName: "test" */
        "@/views/CreatePostPage.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//添加路由前置守卫
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.state.user.isLogin) {
    next("login");
  } else if (to.meta.redirectAleadyAuth && store.state.user.isLogin) {
    next("/");
  } else {
    next();
  }
});
export default router;
