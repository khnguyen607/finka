export default [
  {
    header: "Quản trị",
  },
  {
    title: "Quản lý bảng",
    icon: "DatabaseIcon",
    children: [
      {
        title: "Cấu trúc bảng",
        route: "settings-columns",
      },
      {
        title: "Dữ liệu bảng",
        route: "settings-rows",
      },
    ],
  },
  {
    title: "Người dùng",
    route: "settings-users",
    icon: "UserIcon",
  },
  {
    title: "Cấu hình email",
    route: "settings-configs",
    icon: "MailIcon",
  },
];
