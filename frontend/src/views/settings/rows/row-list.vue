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
          <b-button variant="danger" class="btn-icon mr-1" @click="deleteList">
            <feather-icon icon="TrashIcon" />
          </b-button>
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
          <vue-good-table
            ref="goodTableRef"
            :columns="columns"
            :rows="rows"
            :select-options="{
              enabled: this.rows.length > 0,
              selectOnCheckboxOnly: true,
              selectionText: 'dòng được chọn',
              selectAllByGroup: true,
            }"
            :pagination-options="{
              enabled: true,
              perPage: pageLength,
            }"
          >
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
            <!-- pagination -->
            <template slot="pagination-bottom" slot-scope="props">
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0 mt-1">
                  <span class="text-nowrap"> Showing 1 to </span>
                  <b-form-select
                    v-model="pageLength"
                    :options="['10', '20', '50']"
                    class="mx-1"
                    @input="
                      (value) => props.perPageChanged({ currentPerPage: value })
                    "
                  />
                  <span class="text-nowrap">
                    of {{ props.total }} entries
                  </span>
                </div>
                <div>
                  <b-pagination
                    :value="1"
                    :total-rows="props.total"
                    :per-page="pageLength"
                    first-number
                    last-number
                    align="right"
                    prev-class="prev-item"
                    next-class="next-item"
                    class="mt-1 mb-0"
                    @input="
                      (value) => props.pageChanged({ currentPage: value })
                    "
                  >
                    <template #prev-text>
                      <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                      <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                  </b-pagination>
                </div>
              </div>
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
import TableCreateOrEdit from "./row-create-or-edit.vue";
import vSelect from "vue-select";
import { getRows } from "@/utils/getRows";

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
      columns: [],
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
      pageLength: 10,
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
        await this.$callApi.post("/api/rows/deleteList", {
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
    async getColumns() {
      const data = await this.$callApi.get(
        "/api/columns/table/" + this.tableSelected
      );
      const temp = data.data.data.sort((a, b) => a.indexing - b.indexing);
      this.columns = [];
      temp.forEach((item) => {
        if (item.dataType == "date") {
          this.columns.push({
            label: "Ngày",
            field: "date",
            formatFn: (value) => {
              if (!value) return "";
              const date = new Date(value);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            },
          });
        } else {
          switch (item.filterType) {
            case "none":
              this.columns.push({
                label: item.label,
                field: item.key,
                tdClass: "text-nowrap",
              });
              break;
            case "nomal":
              this.columns.push({
                label: item.label,
                field: item.key,
                filterOptions: {
                  enabled: true,
                  placeholder: "Lọc",
                },
                tdClass: "text-nowrap",
              });
              break;
            default:
              this.columns.push({
                label: item.label,
                field: item.key,
                filterOptions: {
                  enabled: true,
                  placeholder: "Lọc",
                  filterValue: "",
                  filterFn: (rowValue, filterValue) =>
                    this.applyFilter(rowValue, filterValue, item.filterType),
                },
                tdClass: "text-nowrap",
                typeFilter: item.filterType,
              });
              break;
          }
        }
      });
      this.columns.push({
        label: "Thao tác",
        field: "action",
        tdClass: "text-nowrap",
      });
    },
    async getData() {
      await this.getColumns();
      const params = {
        tableId: this.tableSelected,
        dateFrom: this.searchData.dateFrom,
        dateTo: this.searchData.dateTo,
        codes: null,
        sortBy: ["date desc"],
      };
      const data = await getRows(this.$callApi, params);
      this.rows = [];
      data.forEach((item) => {
        this.rows.push({
          id: item.id,
          code: item.code,
          date: item.date,
          ...item.data,
        });
      });
      console.log(this.rows);
    },
    showModalEdit(id) {
      this.id = id;
      this.edit = true;
      this.showModal = true;
    },
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/rows/" + id)
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
