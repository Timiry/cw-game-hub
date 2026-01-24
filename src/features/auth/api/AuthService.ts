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
    return api.post<{ data: UserProfile }>(
      API_URL + accountsEndpoints.login,
      body
    );
  }

  static async register(body: RegisterBody) {
    return api.post(API_URL + accountsEndpoints.register, body);
  }

  static async sendEmailCode(body: { email: string }) {
    return api.post(API_URL + accountsEndpoints.email.code, body);
  }

  static async verifyEmail(params: { code: string }) {
    const searchParams = new URLSearchParams(params);
    return api.get(
      API_URL + accountsEndpoints.email.verify + "?" + searchParams
    );
  }

  static async changePassword(body: {
    currentPassword: string;
    newPassword: string;
  }) {
    return api.post(API_URL + accountsEndpoints.password.change, body);
  }

  static async sendPasswordCode(body: { email: string }) {
    return api.post(API_URL + accountsEndpoints.password.code.send, body);
  }

  static async verifyPasswordCode(params: { code: string }) {
    const searchParams = new URLSearchParams(params);
    return api.get(
      API_URL + accountsEndpoints.password.code.verify + "?" + searchParams
    );
  }

  static async applyPassword(body: { code: string; password: string }) {
    return api.post(API_URL + accountsEndpoints.password.code.apply, body);
  }
}

export default AuthService;
