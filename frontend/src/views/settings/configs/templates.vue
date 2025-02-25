<template>
  <div>
    <!-- Header -->
    <b-row class="my-2">
      <b-col cols="2"><strong>Loại email</strong></b-col>
      <b-col cols="2"><strong>Biệt danh</strong></b-col>
      <b-col cols="3"><strong>Tiêu đề</strong></b-col>
      <b-col cols="5"><strong>Nội dung</strong></b-col>
    </b-row>

    <!-- Danh sách Email -->
    <b-row v-for="(email, key, index) in templates" :key="index" class="my-2">
      <b-col cols="2">
        <b-form-input v-model="key" disabled></b-form-input>
      </b-col>
      <b-col cols="2">
        <b-form-input v-model="email.from"></b-form-input>
      </b-col>
      <b-col cols="3">
        <b-form-input v-model="email.subject"></b-form-input>
      </b-col>
      <b-col cols="5">
        <b-form-input v-model="email.html"></b-form-input>
      </b-col>
    </b-row>

    <b-row align-v="center" align-h="center">
      <b-button variant="primary" @click="saveTemplates">Lưu </b-button>
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
      templates: [],
    };
  },
  methods: {
    async saveTemplates() {
      await this.$callApi
        .put("/api/configs/templates", { data: this.templates })
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
