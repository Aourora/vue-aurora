import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import interceptors from "./utils/intercepts";
import store, { key } from "./store";

axios.defaults.baseURL = "http://139.224.33.149:3000/";

//获取登录信息
axios.interceptors.request.use(interceptors.interceptRequest(store));

axios.interceptors.response.use(
  interceptors.interceptResponseFulfilled(store),
  interceptors.interceptResponseRejected(store)
);

createApp(App).use(route).use(store, key).mount("#app");
