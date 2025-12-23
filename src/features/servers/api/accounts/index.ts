import api from "@/shared/api";
import accountsEndpoints from "@/shared/config/endpoints/accounts";
import type { ServersResponse } from "@/entities/server/model";

const API_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL;

class ServersService {
  static async getServerList() {
    return api.get<{ data: ServersResponse }>(
      API_URL + accountsEndpoints.server.list
    );
  }
}

export default ServersService;
