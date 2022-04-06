import store from "@/store";
import { FETCH_CURRENT_USER_ACTION } from "@/utils/constant";
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
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignupPage.vue"),
    meta: {
      redirectAleadyAuth: true,
    },
  },
  {
    path: "/columnDetail/:id",
    name: "columnDetail",
    component: () =>
      import(
        /* webpackChunkName: "test" */
        "@/views/ColumnDetailPage.vue"
      ),
  },
  {
    path: "/postDetail/:id",
    name: "postDetail",
    component: () =>
      import(
        /* webpackChunkName: "test" */
        "@/views/PostDetailPage.vue"
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
  {
    path: "/createColumn",
    name: "createColumn",
    component: () => import("@/views/CreateColumnPage.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/game",
    name: "game",
    component: () => import("@/views/GamePage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () => import("@/views/NotFoundPage.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//添加路由前置守卫
router.beforeEach((to, from, next) => {
  const { isLogin, role } = store.state.user;
  const { redirectAleadyAuth, requiresAuth, requiresAdmin } = to.meta;
  if (isLogin) {
    if (redirectAleadyAuth || (requiresAdmin && role !== "admin")) {
      //登录状态下访问鉴权页面，跳转首页
      next("/");
    } else {
      next();
    }
  } else {
    //未登录状态，先获取用户信息
    store.dispatch(FETCH_CURRENT_USER_ACTION).then(({ code, data }) => {
      //后台返回用户信息
      if (code === "0") {
        if (redirectAleadyAuth || (requiresAdmin && data.role !== "admin")) {
          //登录状态下访问鉴权页面，跳转首页
          next("/");
        } else {
          next();
        }
      } else if (requiresAuth) {
        next("login");
      } else {
        next();
      }
    });
  }
});
export default router;
