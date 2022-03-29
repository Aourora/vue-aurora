export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export interface PostProps {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface UserProps {
  id: number;
  name: string;
  role: string;
  avatar: string;
  description: string;
  isLogin: boolean;
}

export type ValidateType = "required" | "email";

export interface RuleProps {
  type: ValidateType;
  message: string;
}

export interface ResponseData<T> {
  code: string;
  message: string;
  data: T;
}

export type MessageType = "success" | "error" | "default";

export interface MessageProps {
  status: boolean;
  type?: MessageType;
  message?: string;
}

export type UploaderStatus = "ready" | "loading" | "success" | "error";

export interface CheckCondition {
  format?: string[];
  size?: number;
}

export type ErrorType = "format" | "size";
