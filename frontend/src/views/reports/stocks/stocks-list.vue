<template>
  <div>
    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Mã cổ phiếu khuyến nghị</b-card-title>
        <div>
          <b-button
            v-if="userData.role === 'ADMIN'"
            variant="primary"
            class="btn-icon mr-1"
            @click="
              showModal = true;
              edit = false;
              id = null;
            "
          >
            <feather-icon icon="PlusIcon" />
          </b-button>
          <b-button
            v-if="userData.role === 'ADMIN'"
            variant="success"
            class="btn-icon"
            @click="exportToExcel"
          >
            <feather-icon icon="DownloadIcon" />
          </b-button>
        </div>
      </b-card-header>
      <b-card-body>
        <div>
          <!-- table -->
          <vue-good-table
            ref="goodTableRef"
            :columns="filteredColumns"
            :rows="rows"
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
      <StockCreateOrEdit
        :edit="edit"
        :id="id"
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
import { exportExcel } from "@/views/components/exportExcel/ExportExcel";
import StockCreateOrEdit from "./stocks-create-or-edit.vue";

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
    StockCreateOrEdit,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        dateFrom: null,
        dateTo: null,
      },
      exportExcelData: {
        columns: [],
        rows: [],
      },
      pageLength: 10,
      columns: [
        {
          label: "Mã cổ phiếu",
          field: "code",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          tdClass: "text-nowrap",
        },
        {
          label: "Ngành",
          field: "field",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Xếp hạng BCTC",
          field: "financialRank",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Quý",
          field: "quarter",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Thao tác",
          field: "action",
        },
      ],
      rows: [],
      showModal: false,
      edit: false,
      id: null,
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
    filteredColumns() {
      return this.userData.role === "ADMIN"
        ? this.columns
        : this.columns.filter((column) => column.field !== "action");
    },
  },
  async created() {
    this.exportExcelData.columns = this.columns.map((item) => {
      return {
        label: item.label,
        field: item.field,
        width: 30,
      };
    });
    await this.getData();
  },
  methods: {
    async getData() {
      await this.$callApi.get("/api/stocks").then((res) => {
        const data = res.data.data;
        this.rows = data.sort((a, b) => b.id - a.id);
        this.rows = data;
      });
    },
    exportToExcel() {
      exportExcel(
        this.$XLSX,
        "Report.xlsx",
        this.filteredRows,
        this.exportExcelData.columns
      );
    },
    showModalEdit(id) {
      this.id = id;
      this.edit = true;
      this.showModal = true;
    },
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/stocks/" + id)
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
