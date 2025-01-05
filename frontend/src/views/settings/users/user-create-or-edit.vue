<template>
  <b-form @submit.prevent>
    <b-row>
      <b-col md="6">
        <b-form-group label="Email" label-for="mc-email">
          <b-form-input
            v-model="dataForm.email"
            id="mc-email"
            type="email"
            placeholder="Email"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Mật khẩu" label-for="mc-password">
          <b-form-input
            v-model="dataForm.password"
            id="mc-password"
            type="text"
            placeholder="Mật khẩu"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Họ và tên" label-for="mc-name">
          <b-form-input
            v-model="dataForm.name"
            id="mc-name"
            type="text"
            placeholder="Họ và tên"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Số điện thoại" label-for="mc-phone">
          <b-form-input
            v-model="dataForm.phone"
            id="mc-phone"
            type="text"
            placeholder="Số điện thoại"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Quyền hệ thống" label-for="mc-role">
          <b-form-select
            v-model="dataForm.role"
            id="mc-role"
            :options="options.role"
            placeholder="Quyền hệ thống"
          />
        </b-form-group>
      </b-col>
      <b-col md="6" v-if="edit">
        <b-form-group label="Trạng thái" label-for="mc-status">
          <b-form-select
            v-model="dataForm.status"
            id="mc-status"
            :options="options.status"
            placeholder="Trạng thái"
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
        email: null,
        password: null,
        name: null,
        phone: null,
        position: null,
        teamId: null,
        branchId: null,
        role: "USER",
        status: "accept",
      },
      options: {
        role: [
          { value: "ADMIN", text: "Quản trị viên" },
          { value: "USER", text: "Người dùng" },
        ],
        status: [
          { value: "pending", text: "Chờ duyệt" },
          { value: "reject", text: "Từ chối" },
          { value: "accept", text: "Chấp nhận" },
        ],
      },
    };
  },
  async created() {
    if (this.edit) {
      await this.$callApi
        .get("/api/users/" + this.id)
        .then((res) => (this.dataForm = res.data.data));
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/users/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/users", this.dataForm);
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
