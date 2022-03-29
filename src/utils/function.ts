import jsencrypt from "jsencrypt";
import { HmacSHA256 } from "crypto-js";
import { HMACSHA256KEY, VALIDATE_FUNC } from "./constant";
import { CheckCondition, ErrorType, ResponseData, ValidateType } from "./props";
import axios from "axios";
import markdown from "markdown-it";

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

/**
 * 分段加密
 * @param data
 * @param len
 * @returns
 */
export async function encryptData(
  data: unknown,
  len = 32
): Promise<string | false> {
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
    const pubKey = (await axios.get<ResponseData<string>>("public-key")).data
      .data;
    jsen.setPublicKey(pubKey);

    return Promise.resolve(
      result
        .map((item) => {
          return jsen.encrypt(item);
        })
        .join(",")
    );
  } catch (e) {
    return Promise.resolve(false);
  }
}

export function validate(type: ValidateType): (value: string) => boolean {
  return VALIDATE_FUNC[type];
}

export function beforeUploadCheck(
  file: File,
  condition?: CheckCondition
): { passed: boolean; error?: ErrorType } {
  const { format, size } = condition;
  if (format && !format.includes(file.type)) {
    return { passed: false, error: "format" };
  }
  if (size && file.size / 1024 / 1024 > size) {
    return { passed: false, error: "size" };
  }
  return { passed: true };
}

const md = new markdown();
export function render(data: string): string {
  return md.render(data);
}
