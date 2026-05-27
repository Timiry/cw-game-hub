const accountsEndpoints = {
  user: "/v1/user",
  login: "/v1/login",
  vkLogin: "/v1/oauth/vk",
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
