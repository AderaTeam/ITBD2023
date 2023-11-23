import { IUser } from "shared/models/IUser";

export interface AuthResponse {
  access_token: string;
  user: IUser;
}