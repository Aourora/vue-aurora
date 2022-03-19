import jsencrypt from "jsencrypt";
import { HmacSHA256 } from "crypto-js";
import { HMACSHA256KEY } from "./constant";

export function stringify(
  value: unknown,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number
): string {
  if (typeof value === "string") {
    return value;
  } else if (value instanceof String) {
    value.toString();
  }
  return JSON.stringify(value, replacer, space);
}

/**
 * 计算hash
 * @param params 元数据
 * @returns
 */
export function hashSHA256(params: unknown): string {
  return HmacSHA256(stringify(params), HMACSHA256KEY).toString();
}

const jsen = new jsencrypt();

const pubkey = sessionStorage.getItem("pubkey") as string;

jsen.setPublicKey(pubkey);

/**
 * 分段加密
 * @param data
 * @param len
 * @returns
 */
export function encryptData(data: unknown, len = 32): string | false {
  try {
    const str = JSON.stringify(data);
    const result = [];
    const { length } = str;
    const splitCount = Math.ceil(length / len);
    for (let i = 0; i < splitCount; ++i) {
      const start = i * len;
      const end = (i + 1) * len < length ? (i + 1) * len : length;
      const substr = str.substring(start, end);
      result.push(substr);
    }
    return result
      .map((item) => {
        return jsen.encrypt(item);
      })
      .join(",");
  } catch (e) {
    return false;
  }
}
