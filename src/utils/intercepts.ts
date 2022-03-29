import useMessageInfo from "@/hooks/useMessageInfo";
import { RootState } from "@/store";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SET_LOADING } from "./constant";
import { hashSHA256 } from "./function";

function interceptRequest(
  store: Store<RootState>
): (config: AxiosRequestConfig) => AxiosRequestConfig {
  return (config: AxiosRequestConfig) => {
    store.commit(SET_LOADING, true);
    const excludesPaths = ["getpubkey", "upload"];
    const { url, method, data } = config;

    if (method === "post" && !excludesPaths.includes(url as string) && data) {
      //添加校验信息
      const hash = hashSHA256(data);

      config.data = { hash, data };
    }
    //允许跨域请求携带cookie
    config.withCredentials = true;
    return config;
  };
}

function interceptResponseFulfilled(
  store: Store<RootState>
): (result: AxiosResponse) => AxiosResponse | Promise<AxiosResponse> {
  return (result: AxiosResponse) => {
    store.commit(SET_LOADING, false);
    const { url } = result.config;
    const { code, message } = result.data;
    if (code !== "0" && url !== "user/current") {
      useMessageInfo("error", message);
      return Promise.reject(result);
    }
    return result;
  };
}

function interceptResponseRejected(
  store: Store<RootState>
): (error: unknown) => Promise<unknown> {
  return (error: unknown) => {
    store.commit(SET_LOADING, false);
    useMessageInfo("error", "网络错误");
    return Promise.reject(error);
  };
}

export default {
  interceptRequest,
  interceptResponseFulfilled,
  interceptResponseRejected,
};
