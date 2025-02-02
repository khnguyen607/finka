<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <b-img src="/logo.svg" width="200" class="mb-2" />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1"> Đăng ký tài khoản </b-card-title>
          <!-- form -->
          <validation-observer ref="registerForm" #default="{ invalid }">
            <b-form class="auth-register-form mt-2" @submit.prevent="register">
              <!-- username -->
              <b-form-group label="Họ tên" label-for="register-username">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="name"
                >
                  <b-form-input
                    id="register-username"
                    v-model="name"
                    name="register-username"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group label="Số điện thoại" label-for="register-phone">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="phone"
                >
                  <b-form-input
                    id="register-phone"
                    v-model="phone"
                    name="register-phone"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group label="Email" label-for="register-email">
                <validation-provider
                  #default="{ errors }"
                  name="email"
                  rules="required|email"
                  v-slot="{ invalid }"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group label="Tỉnh thành" label-for="register-provide">
                <validation-provider
                  #default="{ errors }"
                  name="text"
                  rules="required"
                  v-slot="{ invalid }"
                >
                  <v-select
                    v-model="provide"
                    id="register-provide"
                    name="register-provide"
                    :options="provideList"
                    :reduce="(option) => option.label"
                    :clearable="false"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="Mật khẩu">
                <validation-provider
                  #default="{ errors }"
                  name="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                Đăng ký
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Bạn đã có tài khoản?</span>
            <b-link :to="{ name: 'auth-login' }">
              <span>&nbsp;Đăng nhập</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      name: "",
      userEmail: "",
      password: "",
      phone: "",
      provide: "",
      provideList: [],
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  async mounted() {
    await this.getProvide();
  },
  methods: {
    async getProvide() {
      const response = await this.$callApi.get(
        "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
      );
      this.provideList = response.data.data.data.map((item) => ({
        label: item.name,
      }));
    },
    register() {
      this.$refs.registerForm.validate().then(async (success) => {
        try {
          const response = await this.$callApi.post("/api/users/register", {
            name: this.name,
            email: this.userEmail,
            phone: this.phone,
            password: this.password,
          });
          if ((response.status = "success")) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: `Đăng ký thành công`,
                icon: "CoffeeIcon",
                variant: "success",
                text: `Vui lòng chờ đợi tài khoản ${this.userEmail} được kích hoạt!`,
              },
            });
          }
        } catch (error) {
          // Kiểm tra mã lỗi từ server
          let errorMessage = "Đăng ký thất bại!";
          if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
              errorMessage =
                "Thông tin đăng ký không đầy đủ hoặc không hợp lệ!";
            } else if (status === 409) {
              errorMessage = "Email đã tồn tại trong hệ thống!";
            } else if (status === 500) {
              errorMessage =
                "Có lỗi xảy ra trên hệ thống. Vui lòng thử lại sau!";
            } else {
              errorMessage = data.error || "Có lỗi xảy ra!";
            }
          } else {
            errorMessage = error.message || "Không thể kết nối tới server!";
          }

          // Hiển thị thông báo lỗi
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Đăng ký thất bại`,
              icon: "AlertCircleIcon",
              variant: "danger",
              text: errorMessage,
            },
          });

          console.error(
            "Error registering user:",
            error.response || error.message
          );
        }
      });
    },
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
