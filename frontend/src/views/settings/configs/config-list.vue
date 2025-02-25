<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <v-select
        v-model="tableSelected"
        :options="configs"
        :reduce="(option) => option.value"
        :clearable="false"
        style="width: 30%"
      />
    </b-card-header>
    <b-card-body>
      <Emails v-show="tableSelected == 'emails'" ref="emails"></Emails>
      <Templates
        v-show="tableSelected == 'templates'"
        ref="templates"
      ></Templates>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BButton,
  BRow,
  BCol,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import vSelect from "vue-select";
import Emails from "./emails";
import Templates from "./templates";

export default {
  components: {
    VueGoodTable,
    BCard,
    BCardBody,
    BCardTitle,
    BCardHeader,
    BButton,
    BRow,
    BCol,
    vSelect,
    Emails,
    Templates,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      columns: [],
      rows: [],
      showModal: false,
      edit: false,
      id: null,
      configs: [
        {
          value: "emails",
          label: "Email nhận thông báo",
        },
        {
          value: "templates",
          label: "Cấu hình templates email",
        },
      ],
      emailsData: null,
      templatesData: null,
      tableSelected: "emails",
      pageLength: 10,
    };
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Đạt: "light-success",
        "Không đạt": "light-danger",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
  },
  async created() {
    await this.getData();
    this.getEmails();
    this.getTemplates();
  },
  methods: {
    async getData() {
      await this.$callApi.get("/api/configs").then((res) => {
        const data = res.data.data;
        this.emailsData = data.find((item) => item.code == "emails").data;
        this.templatesData = data.find((item) => item.code == "templates").data;
      });
    },
    async getEmails() {
      if (this.emailsData.length > 0) {
        this.$refs.emails.emails = this.emailsData.map((item) => {
          return {
            value: item,
          };
        });
      } else {
        this.$refs.emails.emails = [{ value: "" }];
      }
    },
    async getTemplates() {
      this.$refs.templates.templates = this.templatesData;
    },
  },
};
</script>

<style lang="scss"></style>
