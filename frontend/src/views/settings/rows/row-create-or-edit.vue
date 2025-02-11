<template>
  <div>
    <b-form @submit.prevent>
      <b-row>
        <b-col md="3" v-for="item in inputFields" :key="item.key">
          <b-form-group :label="item.label" :label-for="'mc-' + item.key">
            <b-form-input
              v-model="dataForm[item.key]"
              :id="'mc-' + item.key"
              :type="item.type"
              :step="item.type === 'number' ? 0.01 : null"
              :placeholder="item.label"
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
            v-if="!edit"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="success"
            class="mr-1"
            @click="$refs.upload.click()"
          >
            Nhập dữ liệu từ file Excel
          </b-button>
          <input
            ref="upload"
            type="file"
            accept=".xlsx, .xls, .csv"
            style="display: none"
            @change="handleFileUpload"
          />
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

    <b-modal
      v-model="showModal"
      id="confirm-modal"
      title="Xác nhận ghi đè"
      @ok="handleOverwrite()"
      ok-title="Đồng ý"
      cancel-title="Hủy bỏ"
    >
      <p>Phát hiện dữ liệu trùng lặp. Bạn có muốn ghi đè không?</p>
    </b-modal>
  </div>
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
import { excelToJson } from "@/utils/excelToJson";

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
    tableId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      inputFields: [],
      dataForm: {},
      fieldMapping: {},
      showModal: false,
      dataImport: null,
    };
  },
  async created() {
    await this.getColumns();
    if (this.edit) {
      await this.$callApi.get("/api/rows/" + this.id).then((res) => {
        const data = res.data.data;
        this.dataForm = {
          date: data.date,
          code: data.code,
          ...data.data,
        };
        this.dataForm.date = res.data.data.date.split(" ")[0];
      });
    }
  },
  methods: {
    async getColumns() {
      const data = await this.$callApi.get(
        "/api/columns/table/" + this.tableId
      );
      const temp = data.data.data.sort((a, b) => a.indexing - b.indexing);
      this.dataForm = {};
      this.fieldMapping = {};
      temp.forEach((item) => {
        this.dataForm[item.key] = null;
        switch (item.dataType) {
          case "date":
            this.inputFields.push({
              label: item.label,
              key: item.key,
              type: "date",
            });
            break;
          case "number":
            this.inputFields.push({
              label: item.label,
              key: item.key,
              type: "number",
            });
            break;
          default:
            this.inputFields.push({
              label: item.label,
              key: item.key,
              type: "text",
            });
            break;
        }

        if (item.key !== "code" || item.key !== "date") {
          this.fieldMapping[item.label] = item.key;
        }
      });
    },
    async onSubmit() {
      let data = { ...this.dataForm };
      delete data.date;
      delete data.code;
      const dataForm = {
        tableId: this.tableId,
        code: this.dataForm.code,
        date: this.dataForm.date,
        data: data,
      };
      try {
        if (this.edit) {
          await this.$callApi.put("/api/rows/" + this.id, dataForm);
        } else {
          await this.$callApi.post("/api/rows", dataForm);
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
        let errorMessage = "Có lỗi xảy ra"; // Thông báo lỗi mặc định

        if (error.response && error.response.status) {
          const status = error.response.status;

          if (status === 409) {
            errorMessage = "Dữ liệu đã tồn tại.";
          } else if (status === 422) {
            errorMessage = "Dữ liệu không hợp lệ.";
          } else if (error.response.data && error.response.data.message) {
            // Nếu có thông báo lỗi chi tiết từ backend
            errorMessage = error.response.data.message;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Lỗi`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: errorMessage,
          },
        });
      }
    },
    async handleFileUpload(event) {
      // Hàm chuyển đổi
      const translateFields = (data) => {
        return data.map((item) => {
          const translatedItem = {};
          for (const key in item) {
            if (this.fieldMapping[key]) {
              translatedItem[this.fieldMapping[key]] = item[key];
            }
          }
          const temp = { ...translatedItem };
          delete temp.code;
          delete temp.date;
          return {
            tableId: this.tableId,
            code: translatedItem.code,
            date: translatedItem.date,
            data: temp,
          };
        });
      };
      const file = event.target.files[0];
      if (file) {
        try {
          this.dataImport = translateFields(await excelToJson(file));
          await this.$callApi.post("/api/rows/createList", {
            dataList: this.dataImport,
            overwrite: false,
          });
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
          if (error.response && error.response.status === 400) {
            // Hiển thị modal xác nhận
            this.showModal = true;
          } else {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: `Đã xảy ra lỗi khi đọc file Excel`,
                icon: "AlertCircleIcon",
                variant: "danger",
              },
            });
          }
        }
      }
    },
    async handleOverwrite() {
      await this.$callApi.post("/api/rows/createList", {
        dataList: this.dataImport,
        overwrite: true,
      });
      this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          title: `Thành công`,
          icon: "CheckIcon",
          variant: "success",
        },
      });
      this.$emit("submitted");
    },
  },
};
</script>
