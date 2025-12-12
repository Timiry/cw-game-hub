import { useQuery } from "@tanstack/react-query";
import EngineService from "../../api/engine";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";

export const useServerInfo = (origin: string) => {
  return useQuery({
    queryKey: [QueryKeys.ServerInfo, origin],
    queryFn: () => EngineService.getServerInfo(origin).then((res) => res.data),
  });
};

export default useServerInfo;
