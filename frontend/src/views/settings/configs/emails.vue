<template>
  <div>
    <!-- Header -->
    <b-row class="my-2">
      <b-col cols="8"><strong>Email</strong></b-col>
      <b-col cols="4"><strong>Thao tác</strong></b-col>
    </b-row>

    <!-- Danh sách Email -->
    <b-row v-for="(email, index) in emails" :key="index" class="my-2">
      <!-- Cột Email -->
      <b-col cols="8">
        <b-form-input
          v-model="email.value"
          placeholder="Nhập email"
        ></b-form-input>
      </b-col>

      <!-- Cột Thao tác -->
      <b-col cols="4">
        <b-button variant="primary" @click="addEmail" class="btn-icon">
          <feather-icon icon="PlusIcon" />
        </b-button>
        <b-button
          v-if="emails.length > 1"
          variant="danger"
          @click="removeEmail(index)"
          class="btn-icon ml-1"
        >
          <feather-icon icon="TrashIcon" />
        </b-button>
      </b-col>
    </b-row>

    <b-row align-v="center" align-h="center">
      <b-button variant="primary" @click="saveEmails">Lưu </b-button>
    </b-row>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { BFormGroup, BFormInput, BButton, BRow, BCol } from "bootstrap-vue";

export default {
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BRow,
    BCol,
  },
  data() {
    return {
      emails: [],
    };
  },
  methods: {
    addEmail() {
      this.emails.push({ value: "" });
    },
    removeEmail(index) {
      if (this.emails.length > 1) {
        this.emails.splice(index, 1);
      }
    },
    async saveEmails() {
      const emails = this.emails
        .filter((item) => item.value)
        .map((item) => item.value);
      await this.$callApi
        .put("/api/configs/emails", { data: emails })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Thành công`,
              icon: "CheckIcon",
              variant: "success",
            },
          });
        });
    },
  },
};
</script>

<style></style>
