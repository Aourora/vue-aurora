export const EMAILREG =
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

export type ValidateType = "required" | "email";

export const VALIDATE_FUNC: {
  [key in ValidateType]: (val: string) => boolean;
} = {
  required: (val: string): boolean => {
    return val.trim() !== "";
  },
  email: (val: string): boolean => {
    return EMAILREG.test(val);
  },
};
