export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff" | "patient";
}
