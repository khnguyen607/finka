import Vue from "vue";
import FeatherIcon from "@core/components/feather-icon/FeatherIcon.vue";
import { VueGoodTable } from "vue-good-table";
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
Vue.component(
  FeatherIcon.name,
  FeatherIcon,
  VueGoodTable,
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BButton
);

import callApi from "@/auth/index";
Vue.prototype.$callApi = callApi;

import * as XLSX from "xlsx";
Vue.prototype.$XLSX = XLSX;