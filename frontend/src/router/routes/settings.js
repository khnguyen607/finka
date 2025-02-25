export default [
  {
    path: "/settings/columns",
    name: "settings-columns",
    component: () => import("@/views/settings/columns/column-list.vue"),
  },
  {
    path: "/settings/rows",
    name: "settings-rows",
    component: () => import("@/views/settings/rows/row-list.vue"),
  },
  {
    path: "/settings/users",
    name: "settings-users",
    component: () => import("@/views/settings/users/user-list.vue"),
  },
  {
    path: "/settings/configs",
    name: "settings-configs",
    component: () => import("@/views/settings/configs/config-list.vue"),
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
