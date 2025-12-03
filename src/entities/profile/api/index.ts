import api from '@/shared/api';
import accountsEndpoints from '@/shared/config/endpoints/accounts';
import { UserProfile } from "../model";

const API_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL;

class ProfileService {
  static async getUserProfile() {
    return api.get<{ data: UserProfile }>(
      API_URL + accountsEndpoints.userProfile
    );
  }
}

export default ProfileService;
