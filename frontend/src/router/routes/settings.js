export default [
  {
    path: "/settings/users",
    name: "settings-users",
    component: () => import("@/views/settings/users/user-list.vue"),
  },
  {
    path: "/settings/account-setting",
    name: "pages-account-setting",
    component: () => import("@/views/pages/account-setting/AccountSetting.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
];
