import { AxiosRequestConfig } from "axios";
import { hashSHA256 } from "./function";

function interceptRequest(config: AxiosRequestConfig) {
  const excludesArr = ["/getpubkey"];
  const { url, method, data } = config;
  if (config.headers && localStorage.getItem("token")) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  if (method === "post" && !excludesArr.includes(url as string) && data) {
    //添加校验信息
    const hash = hashSHA256(data);

    config.data = { hash, data };
  }
  //允许跨域请求携带cookie
  config.withCredentials = true;
  return config;
}

function interceptResponse(config: AxiosRequestConfig) {
  const { data } = config;
  if (data && data.data && data.data.token) {
    localStorage.setItem("token", data.data.token);
  }

  return config;
}

export default { interceptRequest, interceptResponse };
