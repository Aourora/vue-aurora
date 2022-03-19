import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import store, { key } from "./store";
import interceptors from "./utils/axios";

axios.defaults.baseURL = "http://localhost:3000/";

axios.get("public-key").then((resolve) => {
  sessionStorage.setItem("pubkey", resolve.data.data);
});

axios.interceptors.request.use(interceptors.interceptRequest);
axios.interceptors.response.use(interceptors.interceptResponse);

createApp(App).use(route).use(store, key).mount("#app");
