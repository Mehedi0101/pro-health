import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: string;
  user_image?: string;
  phone: string;
  date_of_birth: Date;
  address: string;
  blood_group?: string;
}
