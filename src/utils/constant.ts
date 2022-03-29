import { RuleProps, ValidateType } from "./props";

export const FETCH_COLUMNS_ACTION = "fetchColumnsAction";

export const FETCH_POSTS_ACTION = "fetchPostsAction";

export const FETCH_POST_ACTION = "fetchPostAction";

export const FETCH_CURRENT_USER_ACTION = "fetchCurrentUserAction";

export const LOGIN_ACTION = "loginAction";

export const LOGOUT_ACTION = "logoutAction";

export const CRESTE_POST_ACTION = "createPostAction";

export const CRESTE_CLOUMN_ACTION = "createCloumnAction";

export const SET_COLUMNS = "setColumns";

export const SET_POSTS = "setPosts";

export const PUSH_POST = "pushPost";

export const SET_USER_INFO = "setUserInfo";

export const SET_LOADING = "setLoading";

export const SHOW_MESSAGE = "showMessge";

export const HIDE_MESSAGE = "hideMessge";

export const HMACSHA256KEY = "1988";

export const EMAIL_REG =
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

export const VALIDATE_FUNC: Record<ValidateType, (value: string) => boolean> = {
  required: (value: string): boolean => {
    return value.trim() !== "";
  },
  email: (value: string): boolean => {
    return EMAIL_REG.test(value);
  },
};

export const emailRules: RuleProps[] = [
  { type: "required", message: "邮箱不能为空" },
  { type: "email", message: "邮箱不合法" },
];
export const passwordRules: RuleProps[] = [
  { type: "required", message: "密码不能为空" },
];

export const nameRules: RuleProps[] = [
  { type: "required", message: "昵称不能为空" },
];
export const authCodeRules: RuleProps[] = [
  { type: "required", message: "验证码不能为空" },
];
