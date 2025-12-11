import accountsEndpoints from "@/shared/config/endpoints/accounts";
import api from "@/shared/api";
import type { UserProfile } from "@/entities/profile/model";

interface RegisterBody {
  accounts: {
    password: string;
    email: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL;

class AuthService {
  static async login(body: unknown) {
    return api.post<{ data: UserProfile }>(API_URL + accountsEndpoints.login, body);
  }

  static async register(body: RegisterBody) {
    return api.post(API_URL + accountsEndpoints.register, body);
  }

  static async sendEmailCode(body: { email: string }) {
    return api.post(API_URL + accountsEndpoints.email.code, body);
  }

  static async verifyEmail(params: { code: string }) {
    const searchParams = new URLSearchParams(params);
    return api.get(API_URL + accountsEndpoints.email.verify + "?" + searchParams);
  }
}

export default AuthService;
