import type { UserProfile } from "@/entities/profile/model";
import { isClient } from "@/shared/consts";

export const postSuccessAuthMessage = (user: { data: UserProfile }) => {
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
