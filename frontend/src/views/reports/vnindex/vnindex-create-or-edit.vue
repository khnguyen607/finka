<template>
  <div>
    <b-form @submit.prevent>
      <b-row>
        <b-col md="3">
          <b-form-group label="Ngày" label-for="mc-date">
            <b-form-input v-model="dataForm.date" id="mc-date" type="date" />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Điểm" label-for="mc-point">
            <b-form-input
              v-model="dataForm.point"
              id="mc-point"
              type="text"
              placeholder="Điểm"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="P&L" label-for="mc-pl">
            <b-form-input
              v-model="dataForm.pl"
              id="mc-pl"
              type="text"
              placeholder="P&L"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Lệnh mua/bán" label-for="mc-rcm">
            <b-form-input
              v-model="dataForm.rcm"
              id="mc-rcm"
              type="text"
              placeholder="Lệnh mua/bán"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Tỉ lệ mua/bán" label-for="mc-bsRate">
            <b-form-input
              v-model="dataForm.bsRate"
              id="mc-bsRate"
              type="number"
              placeholder="Tỉ lệ mua/bán"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Rủi ro Vn-index" label-for="mc-riskVnindex">
            <b-form-input
              v-model="dataForm.riskVnindex"
              id="mc-riskVnindex"
              type="text"
              placeholder="Rủi ro Vn-index"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Rủi ro vĩ mô" label-for="mc-riskMacro">
            <b-form-input
              v-model="dataForm.riskMacro"
              id="mc-riskMacro"
              type="text"
              placeholder="Rủi ro vĩ mô"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="PE" label-for="mc-pe">
            <b-form-input
              v-model="dataForm.pe"
              id="mc-pe"
              type="number"
              step="0.01"
              placeholder="P/E"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="P/B" label-for="mc-pb">
            <b-form-input
              v-model="dataForm.pb"
              id="mc-pb"
              type="number"
              step="0.01"
              placeholder="P/B"
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
  },
  data() {
    return {
      dataForm: {
        date: null,
        point: null,
        pl: null,
        rcm: null,
        bsRate: null,
        riskVnindex: null,
        riskMacro: null,
        pe: null,
        pb: null,
      },
      fieldMapping: {
        "Ngày": "date",
        "Điểm": "point",
        "P&L": "pl",
        "Lệnh mua/bán": "rcm",
        "Tỷ lệ mua/bán": "bsRate",
        "Rủi to Vn-index": "riskVnindex",
        "Rủi to vĩ mô": "riskMacro",
        "PE": "pe",
        "PB": "pb",
      },
      showModal: false,
      dataImport: null,
    };
  },
  async created() {
    if (this.edit) {
      await this.$callApi.get("/api/vnindexpicks/" + this.id).then((res) => {
        this.dataForm = res.data.data;
        this.dataForm.date = new Date(res.data.data.date)
          .toISOString()
          .split("T")[0];
      });
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/vnindexpicks/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/vnindexpicks", this.dataForm);
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
          return translatedItem;
        });
      };
      const file = event.target.files[0];
      if (file) {
        try {
          this.dataImport = translateFields(await excelToJson(file));
          console.log(this.dataImport);
          await this.$callApi.post("/api/vnindexpicks/createList", {
            data: this.dataImport,
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
      await this.$callApi.post("/api/vnindexpicks/createList", {
        data: this.dataImport,
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
