const routes = {
  main: "/",
  serverList: "/server-list",
  confirmEmail: "/confirm-email",
  login: "/login",
  register: "/register",
  resetPassword: "/reset-password",
  myProfile: "/profile",
  myProfileSettings: "profile/settings",
  userProfile: (id: number) => `/profile/${id}`,
};

export default routes;
