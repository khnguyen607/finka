<template>
  <div>
    <b-form @submit.prevent>
      <b-row>
        <b-col md="4">
          <b-form-group label="Thứ tự" label-for="mc-indexing">
            <b-form-input
              v-model="dataForm.indexing"
              id="mc-indexing"
              type="number"
              placeholder="Thứ tự"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Mã key" label-for="mc-key">
            <b-form-input
              v-model="dataForm.key"
              id="mc-key"
              type="text"
              placeholder="Mã key"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Tên cột" label-for="mc-label">
            <b-form-input
              v-model="dataForm.label"
              id="mc-label"
              type="text"
              placeholder="Tên cột"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Kiểu giá trị" label-for="mc-dataType">
            <b-form-select
              v-model="dataForm.dataType"
              id="mc-dataType"
              :options="[
                { value: null, text: 'Chọn kiểu giá trị' },
                { value: 'number', text: 'Số' },
                { value: 'string', text: 'Chuỗi' },
                { value: 'date', text: 'Ngày' },
              ]"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Kiểu lọc" label-for="mc-filterType">
            <b-form-select
              v-model="dataForm.filterType"
              id="mc-filterType"
              :options="[
                { value: null, text: 'Chọn kiểu lọc' },
                { value: 'none', text: 'Không áp dụng' },
                { value: 'nomal', text: 'Thường' },
                { value: 'range', text: 'Dải giá trị' },
                { value: 'multiselect', text: 'Lựa chọn' },
              ]"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Giá trị mặc định" label-for="mc-defaultValue">
            <b-form-input
              v-model="dataForm.defaultValue"
              id="mc-defaultValue"
              type="text"
              placeholder="Giá trị mặc định"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Bắt buộc" label-for="mc-isRequired">
            <b-form-checkbox
              v-model="dataForm.isRequired"
              id="mc-isRequired"
              switch
            >
            </b-form-checkbox>
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
      required: true,
    },
  },
  data() {
    return {
      dataForm: {
        tableId: null,
        indexing: 0,
        key: null,
        label: null,
        dataType: null,
        filterType: null,
        isRequired: 0,
        defaultValue: null,
      },
    };
  },
  async mounted() {
    this.dataForm.tableId = this.tableId;
  },
  async created() {
    if (this.edit) {
      await this.$callApi.get("/api/columns/" + this.id).then((res) => {
        this.dataForm = res.data.data;
        this.dataForm.date = res.data.data.date.split(" ")[0];
      });
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put("/api/columns/" + this.id, this.dataForm);
        } else {
          await this.$callApi.post("/api/columns", this.dataForm);
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
