<template>
  <div>
    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Mã cổ phiếu khuyến nghị</b-card-title>
        <div v-if="userData.role === 'ADMIN'">
          <b-button variant="danger" class="btn-icon mr-1" @click="deleteList">
            <feather-icon icon="TrashIcon" />
          </b-button>
          <b-button
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
          <b-button variant="success" class="btn-icon" @click="exportToExcel">
            <feather-icon icon="DownloadIcon" />
          </b-button>
        </div>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col md="6">
            <b-form-group label="Từ ngày" label-for="mc-date-from">
              <b-form-datepicker
                v-model="searchData.dateFrom"
                id="mc-date-from"
                placeholder="Chọn từ ngày"
                reset-button
                @input="getData"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Đến ngày" label-for="mc-date-to">
              <b-form-datepicker
                v-model="searchData.dateTo"
                id="mc-date-to"
                placeholder="Đến ngày"
                reset-button
                @input="getData"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <div class="text-right mb-1">
          <b-button
            variant="primary"
            class="btn-icon btn-sm mr-1"
            @click="openFilter"
          >
            <feather-icon icon="FilterIcon" size="15" />
          </b-button>
          <b-button variant="info" class="btn-icon btn-sm">
            <feather-icon icon="AlertCircleIcon" size="15" />
          </b-button>
        </div>
        <div>
          <!-- table -->
          <vue-good-table
            ref="goodTableRef"
            :columns="filteredColumns"
            :rows="rows"
            :select-options="{
              enabled: userData.role === 'ADMIN',
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
      <RcmCreateOrEdit
        :edit="edit"
        :id="id"
        @submitted="
          getData();
          showModal = false;
          edit = false;
        "
      />
    </b-modal>

    <!-- Filter Modal -->
    <b-modal
      id="filter-modal"
      v-model="showFilterModal"
      title="Bộ lọc nâng cao"
      ok-title="Lọc"
      cancel-title="Đóng"
      @ok="setFilter()"
      :key="filterModalKey"
    >
      <!-- Form Lọc -->
      <div v-for="(item, index) in tempFilters" :key="index">
        <b-form-group
          v-if="item.typeFilter === 'multiselect'"
          :label="item.label"
        >
          <v-select
            v-model="item.value"
            :options="item.options"
            :reduce="(option) => option.value"
            multiple
            :clearable="false"
          />
        </b-form-group>

        <b-form-group v-if="item.typeFilter === 'range'" :label="item.label">
          <b-row>
            <b-col>
              <b-form-input
                v-model="item.minValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối thiểu"
              />
            </b-col>
            <b-col>
              <b-form-input
                v-model="item.maxValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối đa"
              />
            </b-col>
          </b-row>
        </b-form-group>
      </div>

      <!-- <div
        v-for="(item, index) in tempFilters"
        :key="index"
        v-if="item.typeFilter === 'range'"
      >
        <b-form-group :label="Thị giá">
          <b-row>
            <b-col>
              <b-form-input
                v-model="tempFilters.price.minValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối thiểu"
              />
            </b-col>
            <b-col>
              <b-form-input
                v-model="tempFilters.price.maxValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối đa"
              />
            </b-col>
          </b-row>
        </b-form-group>
      </div> -->
      <!-- <b-form-group label="Mã CK">
        <v-select
          v-model="tempFilters.code.value"
          :options="tempFilters.code.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group>

      <b-form-group label="Ngành">
        <v-select
          v-model="tempFilters.field.value"
          :options="tempFilters.field.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group>

      <b-form-group label="Lệnh mua/bán">
        <v-select
          v-model="tempFilters.rcm.value"
          :options="tempFilters.rcm.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group>

      <b-form-group label="Chu kỳ mua/bán">
        <v-select
          v-model="tempFilters.bsCycle.value"
          :options="tempFilters.bsCycle.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group> -->
    </b-modal>
    <b-modal
      id="filter-modal"
      v-model="showFilterModal"
      title="Bộ lọc nâng cao"
      ok-title="Lọc"
      cancel-title="Đóng"
      @ok="setFilter()"
      :key="filterModalKey"
    >
      <!-- Form Lọc -->
      <div v-for="(item, index) in tempFilters" :key="index">
        <b-form-group
          v-if="item.typeFilter === 'multiselect'"
          :label="item.label"
        >
          <v-select
            v-model="item.value"
            :options="item.options"
            :reduce="(option) => option.value"
            multiple
            :clearable="false"
          />
        </b-form-group>

        <b-form-group v-if="item.typeFilter === 'range'" :label="item.label">
          <b-row>
            <b-col>
              <b-form-input
                v-model="item.minValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối thiểu"
              />
            </b-col>
            <b-col>
              <b-form-input
                v-model="item.maxValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối đa"
              />
            </b-col>
          </b-row>
        </b-form-group>
      </div>

      <!-- <div
        v-for="(item, index) in tempFilters"
        :key="index"
        v-if="item.typeFilter === 'range'"
      >
        <b-form-group :label="Thị giá">
          <b-row>
            <b-col>
              <b-form-input
                v-model="tempFilters.price.minValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối thiểu"
              />
            </b-col>
            <b-col>
              <b-form-input
                v-model="tempFilters.price.maxValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối đa"
              />
            </b-col>
          </b-row>
        </b-form-group>
      </div> -->
      <!-- <b-form-group label="Mã CK">
        <v-select
          v-model="tempFilters.code.value"
          :options="tempFilters.code.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group>

      <b-form-group label="Ngành">
        <v-select
          v-model="tempFilters.field.value"
          :options="tempFilters.field.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group>

      <b-form-group label="Lệnh mua/bán">
        <v-select
          v-model="tempFilters.rcm.value"
          :options="tempFilters.rcm.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group>

      <b-form-group label="Chu kỳ mua/bán">
        <v-select
          v-model="tempFilters.bsCycle.value"
          :options="tempFilters.bsCycle.options"
          :reduce="(option) => option.value"
          multiple
          :clearable="false"
        />
      </b-form-group> -->
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
import RcmCreateOrEdit from "./rcm-create-or-edit.vue";
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
    RcmCreateOrEdit,
    vSelect,
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
        },
        {
          label: "Mã CK",
          field: "code",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "multiselect"),
          },
          tdClass: "text-nowrap",
          typeFilter: "multiselect",
        },
        {
          label: "Ngành",
          field: "field",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "multiselect"),
          },
          typeFilter: "multiselect",
        },
        {
          label: "Thị giá",
          field: "price",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "range"),
          },
          typeFilter: "range",
        },
        {
          label: "Lệnh mua/bán",
          field: "rcm",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "multiselect"),
          },
          typeFilter: "multiselect",
        },
        {
          label: "Tỷ lệ mua/bán",
          field: "bsRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "range"),
          },
          formatFn: (value) => {
            return value + "%";
          },
          typeFilter: "range",
        },
        {
          label: "Chu kỳ mua/bán",
          field: "bsCycle",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "multiselect"),
          },
          typeFilter: "multiselect",
        },
        {
          label: "P/E",
          field: "pte",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "range"),
          },
          typeFilter: "range",
        },
        {
          label: "P/B",
          field: "ptb",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "range"),
          },
          typeFilter: "range",
        },
        {
          label: "ROE",
          field: "roe",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
            filterFn: (rowValue, filterValue) =>
              this.applyFilter(rowValue, filterValue, "range"),
          },
          formatFn: (value) => {
            return value + "%";
          },
          typeFilter: "range",
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
      showFilterModal: false,
      tempFilters: {},
      filterModalKey: 0,
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
    openFilter() {
      Object.keys(this.tempFilters).forEach((key) => {
        delete this.tempFilters[key].value;
      });
      this.showFilterModal = true;
      // this.filterModalKey++;
    },
    initModalFilter() {
      this.initOptionsFilter();
      this.initRangeFilter();
      this.filterModalKey++;
    },
    setFilter() {
      Object.keys(this.tempFilters).forEach((key) => {
        const column = this.columns.find((item) => item.field === key);
        if (column) {
          if (Array.isArray(this.tempFilters[key].value)) {
            column.filterOptions.filterValue =
              this.tempFilters[key].value.join(",");
          } else if (
            this.tempFilters[key].minValue ||
            this.tempFilters[key].maxValue
          ) {
            column.filterOptions.filterValue = `${this.tempFilters[key].minValue} - ${this.tempFilters[key].maxValue}`;
          }
        }
      });
    },
    initOptionsFilter() {
      const keys = this.columns.filter(
        (item) => item.typeFilter === "multiselect"
      );

      const uniqueValues = {}; // Đối tượng chứa Set cho từng key
      keys.forEach((key) => {
        const field = key.field;
        uniqueValues[field] = new Set(); // Khởi tạo Set cho mỗi field
        this.tempFilters[field] = {};
        this.tempFilters[field].label = key.label;
        this.tempFilters[field].field = field;
        this.tempFilters[field].options = [];
        this.tempFilters[field].typeFilter = "multiselect";
      });

      // Duyệt qua toàn bộ dữ liệu
      this.rows.forEach((item) => {
        keys.forEach((key) => {
          const field = key.field;
          if (!uniqueValues[field].has(item[field])) {
            uniqueValues[field].add(item[field]);
            this.tempFilters[field].options.push({
              label: item[field],
              value: item[field],
            });
          }
        });
      });
    },
    initRangeFilter() {
      const keys = this.columns.filter((item) => item.typeFilter === "range");
      console.log(keys);
      keys.forEach((key) => {
        const field = key.field;
        this.tempFilters[field] = {};
        this.tempFilters[field].label = key.label;
        this.tempFilters[field].field = field;
        this.tempFilters[field].minValue = null;
        this.tempFilters[field].maxValue = null;
        this.tempFilters[field].typeFilter = "range";
      });
    },
    applyFilter(rowValue, filterValue, filterType) {
      switch (filterType) {
        case "multiselect":
          const data = filterValue.split(",");
          if (!Array.isArray(data) || filterValue.length === 0) {
            return true;
          }
          return filterValue.includes(rowValue);

        case "range":
          const [min, max] = filterValue
            .split("-")
            .map((v) => parseFloat(v.trim()));
          if (!isNaN(min) && !isNaN(max)) {
            return rowValue >= min && rowValue <= max;
          }
          if (!isNaN(min)) {
            return rowValue >= min;
          }
          if (!isNaN(max)) {
            return rowValue <= max;
          }
          return true;

        default:
          return true;
      }
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
        .post("/api/stockpicks/date", {
          dateFrom: this.searchData.dateFrom,
          dateTo: this.searchData.dateTo,
        })
        .then((res) => {
          const data = res.data.data;
          this.rows = data.sort((a, b) => b.id - a.id);
          this.rows = data;
        });
      this.initModalFilter();
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
        .delete("/api/stockpicks/" + id)
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
