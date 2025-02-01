<template>
  <div>
    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <v-select
          v-model="tableSelected"
          :options="tables"
          :reduce="(option) => option.value"
          :clearable="false"
          style="width: 30%"
          @input="getData"
        />
        <div v-if="userData.role === 'ADMIN'">
          <b-button
            variant="primary"
            class="btn-icon"
            @click="
              showModal = true;
              edit = false;
              id = null;
            "
          >
            <feather-icon icon="PlusIcon" />
          </b-button>
        </div>
      </b-card-header>
      <b-card-body>
        <div>
          <!-- table -->
          <vue-good-table ref="goodTableRef" :columns="columns" :rows="rows">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'review'">
                <b-badge :variant="statusVariant(props.row.review)">
                  {{ props.row.review }}
                </b-badge>
              </span>
              <span v-else-if="props.column.field === 'action'">
                <span>
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                  >
                    <template v-slot:button-content>
                      <feather-icon
                        icon="MoreVerticalIcon"
                        size="16"
                        class="text-body align-middle mr-25"
                      />
                    </template>
                    <b-dropdown-item @click="showModalEdit(props.row.id)">
                      <feather-icon icon="Edit2Icon" class="mr-50" />
                      <span>Sửa</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="deleteItem(props.row.id)">
                      <feather-icon icon="TrashIcon" class="mr-50" />
                      <span>Xóa</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </span>
              </span>
            </template>
          </vue-good-table>
        </div>
      </b-card-body>
    </b-card>

    <!-- Modal -->
    <b-modal
      id="add-item-modal"
      v-model="showModal"
      :title="edit ? 'Chỉnh sửa' : 'Thêm mới'"
      hide-footer
      size="lg"
    >
      <TableCreateOrEdit
        :edit="edit"
        :id="id"
        :tableId="tableSelected"
        @submitted="
          getData();
          showModal = false;
          edit = false;
        "
      />
    </b-modal>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BButton,
  BFormDatepicker,
  BRow,
  BCol,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import TableCreateOrEdit from "./table-create-or-edit.vue";
import vSelect from "vue-select";

export default {
  components: {
    VueGoodTable,
    BCard,
    BCardBody,
    BCardTitle,
    BCardHeader,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    BFormDatepicker,
    BRow,
    BCol,
    TableCreateOrEdit,
    vSelect,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        dateFrom: null,
        dateTo: null,
      },
      columns: [
        {
          label: "Thứ tự",
          field: "indexing",
          tdClass: "text-nowrap",
        },
        {
          label: "Mã key",
          field: "key",
          tdClass: "text-nowrap",
        },
        {
          label: "Tên cột",
          field: "label",
          tdClass: "text-nowrap",
        },
        {
          label: "Kiểu giá trị",
          field: "dataType",
          tdClass: "text-nowrap",
          formatFn: (value) => {
            switch (value) {
              case "string":
                return "Chuỗi";
              case "number":
                return "Số";
              case "date":
                return "Ngày";
              default:
                return "";
            }
          },
        },
        {
          label: "Kiểu lọc",
          field: "filterType",
          tdClass: "text-nowrap",
          formatFn: (value) => {
            switch (value) {
              case "none":
                return "Không áp dụng";
              case "nomal":
                return "Thường";
              case "range":
                return "Dải giá trị";
              case "multiselect":
                return "Lựa chọn";
              default:
                return "";
            }
          },
        },
        {
          label: "Giá trị mặc định",
          field: "defaultValue",
          tdClass: "text-nowrap",

          formatFn: (value) => {
            const defaultValue = value == null ? "Không có" : value;
            return defaultValue;
          },
        },
        {
          label: "Bắt buộc",
          field: "isRequired",
          tdClass: "text-nowrap",
          formatFn: (value) => {
            switch (value) {
              case 0:
                return "Không";
              case 1:
                return "Có";
              default:
                return "";
            }
          },
        },
        {
          label: "",
          field: "action",
        },
      ],
      rows: [],
      showModal: false,
      edit: false,
      id: null,
      tempFilters: {},
      filterModalKey: 0,
      tables: [
        {
          value: null,
          label: "Chọn bảng dữ liệu",
        },
      ],
      tableSelected: null,
    };
  },
  computed: {
    filteredRows() {
      // Lấy tất cả các hàng đang hiển thị (sau tìm kiếm và phân trang)
      const table = this.$refs.goodTableRef;
      return table ? table.filteredRows[0].children : [];
    },
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Đạt: "light-success",
        "Không đạt": "light-danger",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
  },
  async created() {
    await this.getTables();
  },
  methods: {
    async getTables() {
      await this.$callApi.get("/api/tables").then((res) => {
        const data = res.data.data;
        this.tables = data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
      });
    },
    async deleteList() {
      const selectedItems = this.$refs.goodTableRef.selectedRows.map(
        (item) => item.id
      );
      if (!selectedItems.length) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Không có mục nào được chọn!",
            icon: "AlertCircleIcon",
            variant: "danger",
          },
        });
        return;
      }

      try {
        await this.$callApi.post("/api/stockpicks/deleteList", {
          ids: selectedItems,
        });

        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Thao tác thành công`,
            icon: "CheckIcon",
            variant: "success",
            text: `Đã xóa các bản ghi được`,
          },
        });

        // Làm mới danh sách hoặc cập nhật trạng thái trong bảng
        this.getData();
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Thao tác thất bại`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: error,
          },
        });
        console.error(
          "Error updating status:",
          error.response || error.message
        );
      }
    },
    async getData() {
      await this.$callApi
        .get("/api/columns/table/" + this.tableSelected)
        .then((res) => {
          const data = res.data.data;
          this.rows = data.sort((a, b) => a.indexing - b.indexing);
        });
    },
    showModalEdit(id) {
      this.id = id;
      this.edit = true;
      this.showModal = true;
    },
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/columns/" + id)
        .then(async () => {
          await this.getData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Xóa thành công`,
              icon: "CheckIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
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
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
