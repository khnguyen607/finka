import uiElements from "./ui-elements/index";

export default [
  ...uiElements,
  {
    path: "/apps/calendar",
    name: "apps-calendar",
    component: () => import("@/views/apps/calendar/Calendar.vue"),
  },

  // *===============================================---*
  // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
  // *===============================================---*
  {
    path: "/apps/email",
    name: "apps-email",
    component: () => import("@/views/apps/email/Email.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "email-application",
    },
  },
  {
    path: "/apps/email/:folder",
    name: "apps-email-folder",
    component: () => import("@/views/apps/email/Email.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "email-application",
      navActiveLink: "apps-email",
    },
    beforeEnter(to, _, next) {
      if (
        ["sent", "draft", "starred", "spam", "trash"].includes(to.params.folder)
      )
        next();
      else next({ name: "error-404" });
    },
  },
  {
    path: "/apps/email/label/:label",
    name: "apps-email-label",
    component: () => import("@/views/apps/email/Email.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "email-application",
      navActiveLink: "apps-email",
    },
    beforeEnter(to, _, next) {
      if (
        ["personal", "company", "important", "private"].includes(
          to.params.label
        )
      )
        next();
      else next({ name: "error-404" });
    },
  },

  // *===============================================---*
  // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/todo",
    name: "apps-todo",
    component: () => import("@/views/apps/todo/Todo.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "todo-application",
    },
  },
  {
    path: "/apps/todo/:filter",
    name: "apps-todo-filter",
    component: () => import("@/views/apps/todo/Todo.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "todo-application",
      navActiveLink: "apps-todo",
    },
    beforeEnter(to, _, next) {
      if (["important", "completed", "deleted"].includes(to.params.filter))
        next();
      else next({ name: "error-404" });
    },
  },
  {
    path: "/apps/todo/tag/:tag",
    name: "apps-todo-tag",
    component: () => import("@/views/apps/todo/Todo.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "todo-application",
      navActiveLink: "apps-todo",
    },
    beforeEnter(to, _, next) {
      if (["team", "low", "medium", "high", "update"].includes(to.params.tag))
        next();
      else next({ name: "error-404" });
    },
  },

  // *===============================================---*
  // *--------- CHAT  ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/chat",
    name: "apps-chat",
    component: () => import("@/views/apps/chat/Chat.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "chat-application",
    },
  },

  // *===============================================---*
  // *--------- ECOMMERCE  ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/e-commerce/shop",
    name: "apps-e-commerce-shop",
    component: () =>
      import("@/views/apps/e-commerce/e-commerce-shop/ECommerceShop.vue"),
    meta: {
      contentRenderer: "sidebar-left-detached",
      contentClass: "ecommerce-application",
      pageTitle: "Shop",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Shop",
          active: true,
        },
      ],
    },
  },
  {
    path: "/apps/e-commerce/wishlist",
    name: "apps-e-commerce-wishlist",
    component: () =>
      import(
        "@/views/apps/e-commerce/e-commerce-wishlist/ECommerceWishlist.vue"
      ),
    meta: {
      pageTitle: "Wishlist",
      contentClass: "ecommerce-application",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Wishlist",
          active: true,
        },
      ],
    },
  },
  {
    path: "/apps/e-commerce/checkout",
    name: "apps-e-commerce-checkout",
    component: () =>
      import(
        "@/views/apps/e-commerce/e-commerce-checkout/ECommerceCheckout.vue"
      ),
    meta: {
      pageTitle: "Checkout",
      contentClass: "ecommerce-application",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Checkout",
          active: true,
        },
      ],
    },
  },
  {
    path: "/apps/e-commerce/:slug",
    name: "apps-e-commerce-product-details",
    component: () =>
      import(
        "@/views/apps/e-commerce/e-commerce-product-details/ECommerceProductDetails.vue"
      ),
    meta: {
      pageTitle: "Product Details",
      contentClass: "ecommerce-application",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Shop",
          active: true,
        },
        {
          text: "Product Details",
          active: true,
        },
      ],
    },
  },

  // *===============================================---*
  // *--------- USER ---- ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/users/list",
    name: "apps-users-list",
    component: () => import("@/views/apps/user/users-list/UsersList.vue"),
  },
  {
    path: "/apps/users/view/:id",
    name: "apps-users-view",
    component: () => import("@/views/apps/user/users-view/UsersView.vue"),
  },
  {
    path: "/apps/users/edit/:id",
    name: "apps-users-edit",
    component: () => import("@/views/apps/user/users-edit/UsersEdit.vue"),
  },

  // Invoice
  {
    path: "/apps/invoice/list",
    name: "apps-invoice-list",
    component: () =>
      import("@/views/apps/invoice/invoice-list/InvoiceList.vue"),
  },
  {
    path: "/apps/invoice/preview/:id",
    name: "apps-invoice-preview",
    component: () =>
      import("@/views/apps/invoice/invoice-preview/InvoicePreview.vue"),
  },
  {
    path: "/apps/invoice/add/",
    name: "apps-invoice-add",
    component: () => import("@/views/apps/invoice/invoice-add/InvoiceAdd.vue"),
  },
  {
    path: "/apps/invoice/edit/:id",
    name: "apps-invoice-edit",
    component: () =>
      import("@/views/apps/invoice/invoice-edit/InvoiceEdit.vue"),
  },
  {
    path: "/charts-and-maps/charts/apex-chart",
    name: "charts-apex-chart",
    component: () =>
      import("@/views/charts-and-maps/charts/apex-chart/ApexChart.vue"),
    meta: {
      pageTitle: "Apex Chart",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Apex Chart",
          active: true,
        },
      ],
    },
  },
  {
    path: "/charts-and-maps/charts/chartjs",
    name: "charts-chartjs",
    component: () =>
      import("@/views/charts-and-maps/charts/chartjs/Chartjs.vue"),
    meta: {
      pageTitle: "Chartjs",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Chartjs",
          active: true,
        },
      ],
    },
  },
  {
    path: "/charts-and-maps/charts/echart",
    name: "charts-echart",
    component: () => import("@/views/charts-and-maps/charts/echart/Echart.vue"),
    meta: {
      pageTitle: "Echart",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Echart",
          active: true,
        },
      ],
    },
  },
  {
    path: "/maps/leaflet",
    name: "maps-leaflet",
    component: () => import("@/views/charts-and-maps/maps/leaflet/Leaflet.vue"),
    meta: {
      pageTitle: "Leaflet",
      breadcrumb: [
        {
          text: "Table",
        },
        {
          text: "Leaflet",
          active: true,
        },
      ],
    },
  },

  {
    path: "/forms/form-element/form-select",
    name: "forms-element-select",
    component: () =>
      import("@/views/forms/form-element/form-select/FormSelect.vue"),
    meta: {
      pageTitle: "Select",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Select",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/switch",
    name: "forms-element-switch",
    component: () =>
      import("@/views/forms/form-element/form-switch/Switch.vue"),
    meta: {
      pageTitle: "Switch",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Switch",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/checkbox",
    name: "forms-element-checkbox",
    component: () =>
      import("@/views/forms/form-element/form-checkbox/FormCheckbox.vue"),
    meta: {
      pageTitle: "Checkbox",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Checkbox",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/radio",
    name: "forms-element-radio",
    component: () =>
      import("@/views/forms/form-element/form-radio/FormRadio.vue"),
    meta: {
      pageTitle: "Radio",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Radio",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/input",
    name: "forms-element-input",
    component: () =>
      import("@/views/forms/form-element/form-input/FormInput.vue"),
    meta: {
      pageTitle: "Input",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Input",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/textarea",
    name: "forms-element-textarea",
    component: () =>
      import("@/views/forms/form-element/form-textarea/FormTextArea.vue"),
    meta: {
      pageTitle: "Textarea",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Textarea",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/spinbutton",
    name: "forms-element-spinbutton",
    component: () =>
      import("@/views/forms/form-element/form-spinbutton/FormSpinbutton.vue"),
    meta: {
      pageTitle: "Spinbutton",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Spinbutton",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/input-group",
    name: "forms-element-input-group",
    component: () =>
      import("@/views/forms/form-element/form-input-group/FormInputGroup.vue"),
    meta: {
      pageTitle: "Input Group",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Input Group",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/rating",
    name: "forms-element-rating",
    component: () =>
      import("@/views/forms/form-element/form-rating/FormRating.vue"),
    meta: {
      pageTitle: "Form Rating",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Form Rating",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/tag",
    name: "forms-element-tag",
    component: () => import("@/views/forms/form-element/form-tag/FormTag.vue"),
    meta: {
      pageTitle: "Form Tag",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Form Tag",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/datepicker",
    name: "forms-element-datepicker",
    component: () =>
      import("@/views/forms/form-element/form-datepicker/FormDatepicker.vue"),
    meta: {
      pageTitle: "Form Datepicker",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Form Datepicker",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/timepicker",
    name: "forms-element-timepicker",
    component: () =>
      import("@/views/forms/form-element/form-timepicker/FormTimepicker.vue"),
    meta: {
      pageTitle: "Form Timepicker",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Form Timepicker",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/file-input",
    name: "forms-element-file-input",
    component: () =>
      import("@/views/forms/form-element/form-file-input/FileInput.vue"),
    meta: {
      pageTitle: "File Input",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "File Input",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/auto-suggest",
    name: "extensions-auto-suggest",
    component: () =>
      import("@/views/forms/form-element/autosuggest/AutoSuggest.vue"),
    meta: {
      pageTitle: "Auto Suggest",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Auto Suggest",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/vue-select",
    name: "extensions-vue-select",
    component: () =>
      import("@/views/forms/form-element/vue-select/VueSelect.vue"),
    meta: {
      pageTitle: "Vue Select",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Vue Select",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/quill-editor",
    name: "extensions-quill-editor",
    component: () =>
      import("@/views/forms/form-element/quill-editor/QuillEditor.vue"),
    meta: {
      pageTitle: "Quill Editor",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Quill Editor",
          active: true,
        },
      ],
    },
  },

  {
    path: "/forms/form-element/date-time-picker",
    name: "extensions-date-time-picker",
    component: () =>
      import("@/views/forms/form-element/date-time-picker/DateTimePicker.vue"),
    meta: {
      pageTitle: "Date Time Picker",
      breadcrumb: [
        {
          text: "Extensions",
        },
        {
          text: "Date Time Picker",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-element/form-input-mask",
    name: "forms-element-input-mask",
    component: () =>
      import("@/views/forms/form-element/form-input-mask/FormInputMask.vue"),
    meta: {
      pageTitle: "Input Mask",
      breadcrumb: [
        {
          text: "Form Elements",
        },
        {
          text: "Input Mask",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-layout",
    name: "form-layout",
    component: () => import("@/views/forms/form-layout/FormLayout.vue"),
    meta: {
      pageTitle: "Form Layout",
      breadcrumb: [
        {
          text: "Forms",
        },
        {
          text: "Form Layout",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-wizard",
    name: "form-wizard",
    component: () => import("@/views/forms/form-wizard/FormWizard.vue"),
    meta: {
      pageTitle: "Form Wizard",
      breadcrumb: [
        {
          text: "Forms",
        },
        {
          text: "Form Wizard",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-validation",
    name: "form-validation",
    component: () => import("@/views/forms/form-validation/FormValidation.vue"),
    meta: {
      pageTitle: "Form Validation",
      breadcrumb: [
        {
          text: "Forms",
        },
        {
          text: "Form Validation",
          active: true,
        },
      ],
    },
  },
  {
    path: "/forms/form-repeater",
    name: "form-repeater",
    component: () => import("@/views/forms/form-repeater/FormRepeater.vue"),
    meta: {
      pageTitle: "Form Repeater",
      breadcrumb: [
        {
          text: "Forms",
        },
        {
          text: "Form Repeater",
          active: true,
        },
      ],
    },
  },
  {
    path: "/table/bs-table",
    name: "table-bs-table",
    component: () => import("@/views/table/bs-table/Table.vue"),
    meta: {
      pageTitle: "BS Table",
      breadcrumb: [
        {
          text: "Table",
        },
        {
          text: "BS Table",
          active: true,
        },
      ],
    },
  },
  {
    path: "/table/vue-good-table",
    name: "table-good-table",
    component: () => import("@/views/table/vue-good-table/GoodTable.vue"),
    meta: {
      pageTitle: "Good Table",
      breadcrumb: [
        {
          text: "Table",
        },
        {
          text: "Good Table",
          active: true,
        },
      ],
    },
  },
  {
    path: "/access-control",
    name: "access-control",
    component: () => import("@/views/extensions/acl/AccessControl.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
];
