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
