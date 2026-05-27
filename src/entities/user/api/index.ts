import api from "@/shared/api";
import accountsEndpoints from "@/shared/config/endpoints/accounts";
import type { User } from "../model";

const API_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL;

class UserService {
  static async getUser() {
    return api.get<{ data: User }>(API_URL + accountsEndpoints.user);
  }
}

export default UserService;
