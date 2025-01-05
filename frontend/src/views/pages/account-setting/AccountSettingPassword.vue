<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- new password -->
        <b-col md="6">
          <b-form-group label-for="account-new-password" label="Mật khẩu mới">
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-new-password"
                v-model="newPasswordValue"
                :type="passwordFieldTypeNew"
                name="new-password"
                placeholder="Mật khẩu mới"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconNew"
                  class="cursor-pointer"
                  @click="togglePasswordNew"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ new password -->

        <!-- retype password -->
        <b-col md="6">
          <b-form-group
            label-for="account-retype-new-password"
            label="Nhập lại mật khẩu"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-retype-new-password"
                v-model="RetypePassword"
                :type="passwordFieldTypeRetype"
                name="retype-password"
                placeholder="Nhập lại mật khẩu"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconRetype"
                  class="cursor-pointer"
                  @click="togglePasswordRetype"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ retype password -->

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="changePassword"
          >
            Lưu
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
          >
            Đặt lại
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      newPasswordValue: "",
      RetypePassword: "",
      passwordFieldTypeNew: "password",
      passwordFieldTypeRetype: "password",
    };
  },
  computed: {
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === "password"
        ? "EyeIcon"
        : "EyeOffIcon";
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === "password"
        ? "EyeIcon"
        : "EyeOffIcon";
    },
  },
  methods: {
    async changePassword() {
      if (this.newPasswordValue == "" || this.newPasswordValue == null) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Vui lòng nhập mật khẩu`,
            icon: "WarningIcon",
            variant: "danger",
          },
        });
      } else if (this.newPasswordValue != this.RetypePassword) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Mật khẩu không khớp`,
            icon: "WarningIcon",
            variant: "danger",
          },
        });
      } else if (this.newPasswordValue == this.RetypePassword) {
        await this.$callApi.put("/api/users/" + this.userData.id, {
          password: this.newPasswordValue,
        });
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Đổi mật khẩu thành công`,
            icon: "CheckIcon",
            variant: "success",
          },
        });
      }
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew =
        this.passwordFieldTypeNew === "password" ? "text" : "password";
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype =
        this.passwordFieldTypeRetype === "password" ? "text" : "password";
    },
  },
};
</script>
