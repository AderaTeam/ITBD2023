import { AxiosResponse } from "axios";
import $api from "shared/api";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthServices {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/signin', { email, password })
  }

  static async registration(username: string, email: string, password: string, role: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user', { username, email, password, role })
  }
}

