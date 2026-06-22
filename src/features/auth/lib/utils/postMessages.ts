import type { User } from "@/entities/user/model";
import { isClient } from "@/shared/consts";

export const postSuccessAuthMessage = (user: { data?: User }) => {
  if (isClient) {
    window.opener.postMessage(
      {
        source: "cwg-hub",
        status: "authorization_success",
        user: { id: user?.data?.id },
      },
      "*"
    );
    window.close();
  }
};
