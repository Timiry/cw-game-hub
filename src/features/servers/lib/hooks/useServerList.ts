import { useQuery } from "@tanstack/react-query";
import ServersService from "../../api/accounts";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";

export const useServerList = () => {
  return useQuery({
    queryKey: [QueryKeys.ServerList],
    queryFn: () =>
      ServersService.getServerList().then((res) => res.data.content),
  });
};

export default useServerList;
