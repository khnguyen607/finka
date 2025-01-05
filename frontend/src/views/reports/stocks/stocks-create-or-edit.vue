<template>
  <b-form @submit.prevent>
    <b-row>
      <b-col md="6">
        <b-form-group label="Mã cổ phiếu" label-for="mc-code">
          <b-form-input
            v-model="dataForm.code"
            id="mc-code"
            type="text"
            placeholder="Mã cổ phiếu"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Ngành" label-for="mc-field">
          <b-form-input
            v-model="dataForm.field"
            id="mc-field"
            type="text"
            placeholder="Ngành"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Xếp hạng BCTC" label-for="mc-financialRank">
          <b-form-input
            v-model="dataForm.financialRank"
            id="mc-financialRank"
            type="text"
            placeholder="Xếp hạng BCTC"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Quý" label-for="mc-quarter">
          <b-form-input
            v-model="dataForm.quarter"
            id="mc-quarter"
            type="text"
            placeholder="Quý"
          />
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col md="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="onSubmit"
        >
          {{ edit ? "Chỉnh sửa" : "Thêm mới" }}
        </b-button>
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="reset"
          variant="outline-secondary"
        >
          Đặt lại
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormSelect,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        code: null,
        field: null,
        financialRank: null,
        quarter: null,
      },
    };
  },
  async created() {
    if (this.edit) {
      await this.$callApi
        .get("/api/stocks/" + this.id)
        .then((res) => (this.dataForm = res.data.data));
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/stocks/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/stocks", this.dataForm);
        }
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Thành công`,
            icon: "CheckIcon",
            variant: "success",
          },
        });
        // Sau khi thành công, bắn sự kiện
        this.$emit("submitted");
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Lỗi`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: error,
          },
        });
      }
    },
  },
};
</script>
