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
          <b-form-group label="Mã CK" label-for="mc-code">
            <b-form-input
              v-model="dataForm.code"
              id="mc-code"
              type="text"
              placeholder="Mã CK"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Ngành" label-for="mc-field">
            <b-form-input
              v-model="dataForm.field"
              id="mc-field"
              type="text"
              placeholder="Ngành"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Thị giá" label-for="mc-price">
            <b-form-input
              v-model="dataForm.price"
              id="mc-price"
              type="number"
              step="0.01"
              placeholder="Thị giá"
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
          <b-form-group label="Chu kỳ mua/bán" label-for="mc-bsCycle">
            <b-form-input
              v-model="dataForm.bsCycle"
              id="mc-bsCycle"
              type="text"
              placeholder="Chu kỳ mua/bán"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="P/E" label-for="mc-pte">
            <b-form-input
              v-model="dataForm.pte"
              id="mc-pte"
              type="number"
              step="0.01"
              placeholder="P/E"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="P/B" label-for="mc-ptb">
            <b-form-input
              v-model="dataForm.ptb"
              id="mc-ptb"
              type="number"
              step="0.01"
              placeholder="P/B"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="ROE" label-for="mc-roe">
            <b-form-input
              v-model="dataForm.roe"
              id="mc-roe"
              type="number"
              placeholder="ROE"
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
        code: null,
        field: null,
        price: null,
        rcm: null,
        bsRate: null,
        bsCycle: null,
        pte: null,
        ptb: null,
        roe: null,
      },
      fieldMapping: {
        "Ngày": "date",
        "Mã CK": "code",
        Ngành: "field",
        "Thị giá": "price",
        "Lệnh mua/bán": "rcm",
        "Tỷ lệ mua/bán": "bsRate",
        "Chu kỳ mua/bán": "bsCycle",
        "P/E": "pte",
        "P/B": "ptb",
        ROE: "roe",
      },
      showModal: false,
      dataImport: null,
    };
  },
  async created() {
    if (this.edit) {
      await this.$callApi.get("/api/stockpicks/" + this.id).then((res) => {
        this.dataForm = res.data.data;
        this.dataForm.date = res.data.data.date.split(" ")[0];
      });
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/stockpicks/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/stockpicks", this.dataForm);
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
          await this.$callApi.post("/api/stockpicks/createList", {
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
      await this.$callApi.post("/api/stockpicks/createList", {
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
