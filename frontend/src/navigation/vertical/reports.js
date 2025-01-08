export default [
  {
    header: "Tra cứu",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Cổ phiếu yêu thích",
    icon: "SearchIcon",
    route: "reports-rcm-liked-list",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Khuyến nghị",
    icon: "SearchIcon",
    route: "reports-rcm-list",
    action: "read",
    resource: "ACL",
  },
  {
    title: "VNindex",
    icon: "SearchIcon",
    route: "reports-vnindex-list",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Mã cổ phiếu",
    icon: "SearchIcon",
    children: [
      {
        title: "Danh sách mã cổ phiếu",
        route: "reports-stocks-list",
      },
      {
        title: "Chi tiết phiên",
        route: "reports-stock-details",
        action: "read",
        resource: "ACL",
      },
    ],
  },
];
