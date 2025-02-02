export default [
  {
    header: "Apps & Pages",
  },
  {
    title: "Email",
    route: "apps-email",
    icon: "MailIcon",
  },
  {
    title: "Chat",
    route: "apps-chat",
    icon: "MessageSquareIcon",
  },
  {
    title: "Todo",
    route: "apps-todo",
    icon: "CheckSquareIcon",
  },
  {
    title: "Calendar",
    route: "apps-calendar",
    icon: "CalendarIcon",
  },
  {
    title: "Invoice",
    icon: "FileTextIcon",
    children: [
      {
        title: "List",
        route: "apps-invoice-list",
      },
      {
        title: "Preview",
        route: { name: "apps-invoice-preview", params: { id: 4987 } },
      },
      {
        title: "Edit",
        route: { name: "apps-invoice-edit", params: { id: 4987 } },
      },
      {
        title: "Add",
        route: { name: "apps-invoice-add" },
      },
    ],
  },
  {
    title: "eCommerce",
    icon: "ShoppingCartIcon",
    children: [
      {
        title: "Shop",
        route: "apps-e-commerce-shop",
      },
      {
        title: "Details",
        route: {
          name: "apps-e-commerce-product-details",
          params: { slug: "apple-watch-series-5-27" },
        },
      },
      {
        title: "Wishlist",
        route: "apps-e-commerce-wishlist",
      },
      {
        title: "Checkout",
        route: "apps-e-commerce-checkout",
      },
    ],
  },
  {
    title: "User",
    icon: "UserIcon",
    children: [
      {
        title: "List",
        route: "apps-users-list",
      },
      {
        title: "View",
        route: { name: "apps-users-view", params: { id: 21 } },
      },
      {
        title: "Edit",
        route: { name: "apps-users-edit", params: { id: 21 } },
      },
    ],
  },
  {
    title: "Pages",
    icon: "FileIcon",
    children: [
      {
        title: "Authentication",
        icon: "CircleIcon",
        children: [
          {
            title: "Login v1",
            route: "auth-login-v1",
            target: "_blank",
          },
          {
            title: "Login v2",
            route: "auth-login-v2",
            target: "_blank",
          },
          {
            title: "Register v1",
            route: "auth-register-v1",
            target: "_blank",
          },
          {
            title: "Register v2",
            route: "auth-register-v2",
            target: "_blank",
          },
          {
            title: "Forgot Password v1",
            route: "auth-forgot-password-v1",
            target: "_blank",
          },
          {
            title: "Forgot Password v2",
            route: "auth-forgot-password-v2",
            target: "_blank",
          },
          {
            title: "Reset Password v1",
            route: "auth-reset-password-v1",
            target: "_blank",
          },
          {
            title: "Reset Password v2",
            route: "auth-reset-password-v2",
            target: "_blank",
          },
        ],
      },
      {
        title: "Account Settings",
        route: "pages-account-setting",
      },
      {
        title: "Profile",
        route: "pages-profile",
      },
      {
        title: "Faq",
        route: "pages-faq",
      },
      {
        title: "Knowledge Base",
        route: "pages-knowledge-base",
      },
      {
        title: "Pricing",
        route: "pages-pricing",
      },
      {
        title: "Blog",
        children: [
          {
            title: "List",
            route: "pages-blog-list",
          },
          {
            title: "Detail",
            route: { name: "pages-blog-detail", params: { id: 1 } },
          },
          {
            title: "Edit",
            route: { name: "pages-blog-edit", params: { id: 1 } },
          },
        ],
      },
      {
        title: "Mail Templates",
        children: [
          {
            title: "Welcome",
            href: "https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html",
          },
          {
            title: "Reset Password",
            href: "https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html",
          },
          {
            title: "Verify Email",
            href: "https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html",
          },
          {
            title: "Deactivate Account",
            href: "https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html",
          },
          {
            title: "Invoice",
            href: "https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html",
          },
          {
            title: "Promotional",
            href: "https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html",
          },
        ],
      },
      {
        title: "Miscellaneous",
        icon: "CircleIcon",
        children: [
          {
            title: "Coming Soon",
            route: "misc-coming-soon",
            target: "_blank",
          },
          {
            title: "Not Authorized",
            route: "misc-not-authorized",
            target: "_blank",
          },
          {
            title: "Under Maintenance",
            route: "misc-under-maintenance",
            target: "_blank",
          },
          {
            title: "Error",
            route: "misc-error",
            target: "_blank",
          },
        ],
      },
    ],
  },
  {
    header: "Others",
  },
  {
    title: "Access Control",
    route: "access-control",
    icon: "ShieldIcon",
    // acl: {
    action: "read",
    resource: "ACL",
    // },
  },
  {
    title: "Menu Levels",
    icon: "MenuIcon",
    children: [
      {
        title: "Menu Level 2.1",
        route: null,
      },
      {
        title: "Menu Level 2.2",
        children: [
          {
            title: "Menu Level 3.1",
            route: null,
          },
          {
            title: "Menu Level 3.2",
            route: null,
          },
        ],
      },
    ],
  },
  {
    title: "Disabled Menu",
    route: null,
    icon: "EyeOffIcon",
    disabled: true,
  },
  {
    title: "Raise Support",
    href: "https://pixinvent.ticksy.com/",
    icon: "LifeBuoyIcon",
  },
  {
    title: "Documentation",
    href: "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation",
    icon: "FileTextIcon",
  },
  {
    header: "Charts & Maps",
  },
  {
    title: "Charts",
    icon: "PieChartIcon",
    tag: "3",
    tagVariant: "light-danger",
    children: [
      {
        title: "Apex Chart",
        route: "charts-apex-chart",
      },
      {
        title: "Chartjs",
        route: "charts-chartjs",
      },
      {
        title: "Echart",
        route: "charts-echart",
      },
    ],
  },
  {
    title: "Leaflet",
    route: "maps-leaflet",
    icon: "MapIcon",
  },
  {
    header: "User Interface",
  },
  {
    title: "Typography",
    route: "ui-typography",
    icon: "TypeIcon",
  },
  {
    title: "Colors",
    route: "ui-colors",
    icon: "DropletIcon",
  },
  {
    title: "Feather",
    route: "ui-feather",
    icon: "EyeIcon",
  },
  {
    title: "Cards",
    icon: "CreditCardIcon",
    tag: "new",
    tagVariant: "light-success",
    children: [
      {
        title: "Basic",
        route: "card-basic",
      },
      {
        title: "Advance",
        route: "card-advance",
      },
      {
        title: "Statistics",
        route: "card-statistic",
      },
      {
        title: "Analytics",
        route: "card-analytic",
      },
      {
        title: "Card Actions",
        route: "card-action",
      },
    ],
  },
  {
    title: "Components",
    icon: "ArchiveIcon",
    children: [
      {
        title: "Alert",
        route: "components-alert",
      },
      {
        title: "Aspect",
        route: "components-aspect",
      },
      {
        title: "Avatar",
        route: "components-avatar",
      },
      {
        title: "Badge",
        route: "components-badge",
      },
      {
        title: "Breadcrumb",
        route: "components-breadcrumb",
      },
      {
        title: "Button",
        route: "components-button",
      },
      {
        title: "Button Group",
        route: "components-button-group",
      },
      {
        title: "Button Toolbar",
        route: "components-button-toolbar",
      },
      {
        title: "Calendar",
        route: "components-calendar",
      },
      {
        title: "Carousel",
        route: "components-carousel",
      },
      {
        title: "Collapse",
        route: "components-collapse",
      },
      {
        title: "Dropdown",
        route: "components-dropdown",
      },
      {
        title: "Embed",
        route: "components-embed",
      },
      {
        title: "Image",
        route: "components-image",
      },
      {
        title: "List Group",
        route: "components-list-group",
      },
      {
        title: "Media Objects",
        route: "components-media",
      },
      {
        title: "Modal",
        route: "components-modal",
      },
      {
        title: "Nav",
        route: "components-nav",
      },
      {
        title: "Overlay",
        route: "components-overlay",
      },
      {
        title: "Pagination",
        route: "components-pagination",
      },
      {
        title: "Pagination Nav",
        route: "components-pagination-nav",
      },
      {
        title: "Pill",
        route: "components-pill",
      },
      {
        title: "Pill Badge",
        route: "components-pill-badge",
      },
      {
        title: "Popover",
        route: "components-popover",
      },
      {
        title: "Progress",
        route: "components-progress",
      },
      {
        title: "Sidebar",
        route: "components-sidebar",
      },
      {
        title: "spinner",
        route: "components-spinner",
      },
      {
        title: "Tab",
        route: "components-tab",
      },
      {
        title: "Time",
        route: "components-time",
      },
      {
        title: "Timeline",
        route: "components-timeline",
      },
      {
        title: "Toasts",
        route: "components-toasts",
      },
      {
        title: "Tooltip",
        route: "components-tooltip",
      },
    ],
  },
  {
    title: "Extensions",
    icon: "PlusCircleIcon",
    children: [
      {
        title: "Sweet Alert",
        route: "extensions-sweet-alert",
      },
      {
        title: "Toastification",
        route: "extensions-toastification",
      },
      {
        title: "Slider",
        route: "extensions-slider",
      },
      {
        title: "Drag & Drop",
        route: "extensions-drag-and-drop",
      },

      {
        title: "Tour",
        route: "extensions-tour",
      },

      {
        title: "Clipboard",
        route: "extensions-clipboard",
      },
      {
        title: "Context Menu",
        route: "extensions-context-menu",
      },

      {
        title: "Swiper",
        route: "extensions-swiper",
      },

      // {
      //   title: 'Tree',
      //   route: 'extensions-tree',
      // },

      {
        title: "I18n",
        route: "extensions-i18n",
      },
    ],
  },
  {
    title: "Page Layouts",
    icon: "LayoutIcon",
    children: [
      {
        title: "Collapsed Menu",
        route: "page-layout-collapsed-menu",
      },
      {
        title: "Layout Boxed",
        route: "page-layout-boxed-layout",
      },
      {
        title: "Without Menu",
        route: "page-layout-without-menu",
      },
      {
        title: "Layout Empty",
        route: "page-layout-layout-empty",
      },
      {
        title: "Layout Blank",
        route: "page-layout-layout-blank",
      },
    ],
  },
  {
    header: "Forms & Tables",
  },
  {
    title: "Forms Elements",
    icon: "CopyIcon",
    children: [
      {
        title: "Input",
        route: "forms-element-input",
      },
      {
        title: "Input Group",
        route: "forms-element-input-group",
      },
      {
        title: "Input Mask",
        route: "forms-element-input-mask",
      },
      {
        title: "Textarea",
        route: "forms-element-textarea",
      },
      {
        title: "Auto Suggest",
        route: "extensions-auto-suggest",
      },
      {
        title: "Checkbox",
        route: "forms-element-checkbox",
      },
      {
        title: "Radio",
        route: "forms-element-radio",
      },
      {
        title: "Switch",
        route: "forms-element-switch",
      },
      {
        title: "Select",
        route: "forms-element-select",
      },
      {
        title: "Vue Select",
        route: "extensions-vue-select",
      },
      {
        title: "Spinbutton",
        route: "forms-element-spinbutton",
      },
      {
        title: "File Input",
        route: "forms-element-file-input",
      },
      {
        title: "Quill Editor",
        route: "extensions-quill-editor",
      },
      {
        title: "Form Datepicker",
        route: "forms-element-datepicker",
      },
      {
        title: "Form Timepicker",
        route: "forms-element-timepicker",
      },
      {
        title: "Date Time Picker",
        route: "extensions-date-time-picker",
      },
      {
        title: "Form Rating",
        route: "forms-element-rating",
      },
      {
        title: "Form Tag",
        route: "forms-element-tag",
      },
    ],
  },
  {
    title: "Form Layout",
    route: "form-layout",
    icon: "CopyIcon",
  },
  {
    title: "Form Wizard",
    route: "form-wizard",
    icon: "PackageIcon",
  },
  {
    title: "Form Validation",
    route: "form-validation",
    icon: "CheckCircleIcon",
  },
  {
    title: "Form Repeater",
    route: "form-repeater",
    icon: "CopyIcon",
  },
  {
    title: "BS Table",
    route: "table-bs-table",
    icon: "ServerIcon",
  },
  {
    title: "Good Table",
    route: "table-good-table",
    icon: "GridIcon",
  },
];
