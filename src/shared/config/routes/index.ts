const routes = {
  main: "/",
  serverList: "/server-list",
  confirmEmail: "/confirm-email",
  login: "/login",
  register: "/register",
  resetPassword: "/reset-password",
  myProfile: "/profile",
  myProfileSettings: "/profile/settings",
  userProfile: (id: number) => `/profile/${id}`,
  legal: "/legal",
  legalTerms: "/legal/terms",
  legalPrivacy: "/legal/privacy",
};

export default routes;
