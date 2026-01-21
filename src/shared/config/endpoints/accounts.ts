const accountsEndpoints = {
  userProfile: "/v1/user-profile",
  login: "/v1/login",
  register: "/v1/register",
  server: {
    list: "/v1/server/list",
  },
  email: {
    code: "/v1/email/code",
    verify: "/v1/email/verify",
  },
  password: {
    change: "/v1/password/change",
    code: {
      send: "/v1/password/code/send",
      verify: "/v1/password/code/verify",
      apply: "/v1/password/code/apply",
    },
  },
};

export default accountsEndpoints;
