export default [
  {
    path: "/reports/rcm/list",
    name: "reports-rcm-list",
    component: () => import("@/views/reports/rcm/rcm-list.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/vnindex/list",
    name: "reports-vnindex-list",
    component: () => import("@/views/reports/vnindex/vnindex-list.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/stocks/list",
    name: "reports-stocks-list",
    component: () => import("@/views/reports/stocks/stocks-list.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/stock-details/list",
    name: "reports-stock-details",
    component: () => import("@/views/reports/stock-details/stock-details-list.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/stock-details/list/:id",
    name: "reports-stock-details",
    component: () => import("@/views/reports/stock-details/stock-details-list.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
];
