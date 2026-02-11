export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff" | "patient";
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IForgotPasswordInput {
  email: string;
}

export interface IVerifyOtpInput {
  email: string;
  otp: string;
}

export interface IResetPasswordInput {
  email: string;
  otp: string;
  newPassword: string;
}
