<template>
  <div>
    <b-form @submit.prevent>
      <b-row>
        <b-col sm="3" v-for="item in fields" :key="item.indexing">
          <b-form-group
            :label="item.label"
            :label-for="'mc-' + item.key"
            class="text-nowrap"
          >
            <b-form-checkbox
              v-model="item.isShow"
              :id="'mc-' + item.key"
              switch
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
            Lưu
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
  data() {
    return {
      fields: [],
      dataForm: [],
    };
  },
  async created() {
    await this.getColumns();
  },
  methods: {
    async getColumns() {
      const data = await this.$callApi.get("/api/columns/table/1");
      const temp = data.data.data.sort((a, b) => a.indexing - b.indexing);
      temp.forEach((item) => {
        this.fields.push({
          key: item.key,
          label: item.label,
          indexing: item.indexing,
          isShow: true,
        });
      });
      console.log(this.fields);
    },
    async onSubmit() {
      try {
        await this.$callApi.post("/api/stockpicks", this.dataForm);
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
