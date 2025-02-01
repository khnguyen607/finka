export default [
  {
    path: "/settings/rows",
    name: "settings-rows",
    component: () => import("@/views/settings/rows/row-list.vue"),
  },
  {
    path: "/settings/tables",
    name: "settings-tables",
    component: () => import("@/views/settings/tables/table-list.vue"),
  },
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
