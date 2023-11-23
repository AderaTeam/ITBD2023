import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/IUser';
import AuthServices from '../services/AuthServices';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from 'shared/api';

export default class UserStore {
  user = {} as IUser;
  isAuth = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthServices.login(email, password);
      localStorage.setItem('token', response.data.access_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const response = await AuthServices.registration(
        username,
        email,
        password,
        role
      );
      localStorage.setItem('token', response.data.access_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    if (localStorage.getItem('token')) {
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}/user/access/${localStorage.getItem('token')}`
        );
        this.setAuth(true);
        this.setUser(response.data.user);
      } catch (e: any) {
        console.log(e.response?.data?.message);
      } finally {
        this.setLoading(false);
      }
    }
  }
}
