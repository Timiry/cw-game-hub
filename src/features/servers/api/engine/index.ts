import engineEndpoints from "@/shared/config/endpoints/engine";
import api from "@/shared/api";
import type { ServerInfo } from "@/entities/server/model";

class EngineService {
  static async getServerInfo(origin: string) {
    return api.get<{ data: ServerInfo }>(origin + engineEndpoints.info);
  }
}

export default EngineService;
