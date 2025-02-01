export default [
  {
    header: "Quản trị",
  },
  {
    title: "Quản lý cấu trúc",
    icon: "DatabaseIcon",
    children: [
      {
        title: "Cột dữ liệu",
        route: "settings-tables",
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
];
