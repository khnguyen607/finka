<template>
  <div>
    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Đánh giá mã cổ phiếu</b-card-title>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col>
            <b-form-group label="Mã cổ phiếu" label-for="mc-stockCode">
              <v-select
                v-model="searchData.stockCode"
                id="mc-stockCode"
                :options="options.stocks"
                placeholder="Chọn mã cổ phiếu"
                :clearable="false"
                @input="onStockChange"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Ngành" label-for="mc-field">
              <b-form-input
                v-model="searchData.field"
                id="mc-field"
                type="text"
                placeholder="Không có dữ liệu"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Xếp hạng BCTC" label-for="mc-financialRank">
              <b-form-input
                v-model="searchData.financialRank"
                id="mc-financialRank"
                type="text"
                placeholder="Không có dữ liệu"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card p-5 v-if="codeStockCurrent">
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Mã cổ phiếu khuyến nghị</b-card-title>
        <div>
          <!-- <b-button
            variant="secondary"
            class="btn-icon mr-1"
            @click="showModal = true"
          >
            <feather-icon icon="EyeOffIcon" />
          </b-button> -->
          <b-button variant="primary" class="btn-icon mr-1" @click="openFilter">
            <feather-icon icon="FilterIcon" />
          </b-button>
          <b-button
            variant="info"
            class="btn-icon"
            @click="showAnnotationModal = true"
          >
            <feather-icon icon="AlertCircleIcon" />
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
        <div>
          <!-- table -->
          <vue-good-table
            ref="goodTableRef"
            :columns="columns"
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
      title="Hiển thị cột"
      hide-footer
      size="lg"
    >
      <RcmHideData
        @submitted="
          getData();
          showModal = false;
        "
      />
    </b-modal>

    <!-- Filter Modal -->
    <b-modal
      v-if="showFilterModal"
      v-model="showFilterModal"
      id="filter-modal"
      title="Bộ lọc nâng cao"
      ok-title="Lọc"
      cancel-title="Đóng"
      @ok="setFilter()"
    >
      <!-- Form Lọc -->
      <div v-for="(key, index) in Object.keys(tempFilters)" :key="index">
        <b-form-group
          v-if="tempFilters[key].typeFilter === 'multiselect'"
          :label="tempFilters[key].label"
        >
          <v-select
            v-model="multiSelected[key]"
            :options="tempFilters[key].options"
            :reduce="(option) => option.value"
            multiple
            :clearable="false"
          />
        </b-form-group>

        <b-form-group
          v-if="tempFilters[key].typeFilter === 'range'"
          :label="tempFilters[key].label"
        >
          <b-row>
            <b-col>
              <b-form-input
                v-model="tempFilters[key].minValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối thiểu"
              />
            </b-col>
            <b-col>
              <b-form-input
                v-model="tempFilters[key].maxValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="Giá trị tối đa"
              />
            </b-col>
          </b-row>
        </b-form-group>
      </div>
    </b-modal>

    <!-- Annotation Modal -->
    <b-modal
      v-model="showAnnotationModal"
      title="Chú thích"
      hide-footer
      centered
    >
      <b-list-group>
        <b-list-group-item
          v-for="(annotation, index) in annotations"
          :key="index"
        >
          <strong
            >{{ annotation.keyword }}:
            <span class="text-muted">{{ annotation.annotation }}</span></strong
          >
          <br>
        </b-list-group-item>
      </b-list-group>
    </b-modal>
  </div>
</template>

<script>
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
import RcmHideData from "./stock-hide-data.vue";
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
    RcmHideData,
    vSelect,
  },
  data() {
    return {
      tableId: 1,
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        stockCode: null,
        field: null,
        financialRank: null,
        dateFrom: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        dateTo: new Date().toISOString().split("T")[0],
      },
      pageLength: 10,
      columns: [],
      rows: [],
      showModal: false,
      showFilterModal: false,
      showAnnotationModal: false,
      tempFilters: {},
      filterModalKey: Date.now(),
      annotations: [],
      options: {
        stocks: [],
      },
      multiSelected: {},
    };
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Đạt: "light-success",
        "Không đạt": "light-danger",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
    codeStockCurrent() {
      return this.$route.params.id;
    },
  },
  async created() {
    await this.getStocks();
    await this.getColumns();
    await this.getData();
  },
  methods: {
    onStockChange(stockCode) {
      this.searchData.financialRank = null;
      this.$router.push(`/reports/stock-details/list/${stockCode.label}`);
      this.getData();
    },
    async getStocks() {
      const data = await getRows(this.$callApi, {
        tableId: 4,
      });
      data.forEach((item) => {
        this.options.stocks.push({
          value: item.code,
          label: item.code,
          field: item.data.field,
        });
        if (item.code == this.codeStockCurrent) {
          this.searchData.stockCode = item.code;
        }
      });
    },
    openFilter() {
      this.showFilterModal = true;
    },
    initModalFilter() {
      this.multiSelected = {};
      this.tempFilters = {};
      const initOptionsFilter = () => {
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
      };
      const initRangeFilter = () => {
        const keys = this.columns.filter((item) => item.typeFilter === "range");
        keys.forEach((key) => {
          const field = key.field;
          this.tempFilters[field] = {};
          this.tempFilters[field].label = key.label;
          this.tempFilters[field].field = field;
          this.tempFilters[field].minValue = null;
          this.tempFilters[field].maxValue = null;
          this.tempFilters[field].typeFilter = "range";
        });
      };
      initOptionsFilter();
      initRangeFilter();
      this.filterModalKey = Date.now();
    },
    setFilter() {
      Object.keys(this.tempFilters).forEach((key) => {
        this.tempFilters[key].value = this.multiSelected[key];
      });
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
          } else {
            column.filterOptions.filterValue = "";
          }
        }
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
    async getColumns() {
      const data = await this.$callApi.get(
        "/api/columns/table/" + this.tableId
      );
      const temp = data.data.data.sort((a, b) => a.indexing - b.indexing);
      this.columns = [];
      this.annotations = [];
      temp.forEach((item) => {
        let column = {
          label: item.label,
          thClass: "text-left",
          field: item.key,
        };
        switch (item.dataType) {
          case "date":
            column = {
              ...column,
              type: "date",
              dateInputFormat: "yyyy-MM-dd HH:mm:ss",
              dateOutputFormat: "dd/MMM/yy",
            };
            break;
          case "number":
            column = {
              ...column,
              type: "number",
              formatFn: (value) => Number(value).toFixed(2),
            };
            break;
          case "rate":
            column = {
              ...column,
              type: "number",
              formatFn: (value) => Number(value).toFixed(2) + "%",
              sortFn: (x, y) => Number(x) - Number(y),
            };
            break;
          default:
            break;
        }
        switch (item.filterType) {
          case "none":
            break;
          case "nomal":
            column.filterOptions = {
              enabled: true,
              placeholder: "Lọc",
            };
            break;
          default:
            column.filterOptions = {
              enabled: true,
              placeholder: "Lọc",
              filterValue: "",
              filterFn: (rowValue, filterValue) =>
                this.applyFilter(rowValue, filterValue, item.filterType),
            };
            column.typeFilter = item.filterType;
            break;
        }
        this.columns.push(column);

        if (item.annotation) {
          this.annotations.push({
            keyword: item.label,
            annotation: item.annotation,
          });
        }
      });
    },
    async getData() {
      const params = {
        tableId: this.tableId,
        dateFrom: this.searchData.dateFrom,
        dateTo: this.searchData.dateTo,
        codes: [this.codeStockCurrent],
        sortBy: ["date desc"],
      };
      const data = await getRows(this.$callApi, params);
      this.rows = [];
      data.forEach((item) => {
        this.rows.push({
          code: item.code,
          date: item.date,
          ...item.data,
        });
      });
      this.initModalFilter();

      const codeSelected = this.options.stocks.find(
        (item) => item.value === this.codeStockCurrent
      );
      this.searchData.field = codeSelected.field;
      const stockRanks = await getRows(this.$callApi, {
        tableId: 3,
        codes: [this.codeStockCurrent],
        sortBy: ["date desc"],
      });
      this.searchData.financialRank =
        stockRanks[0] && stockRanks[0].data ? stockRanks[0].data.rank : null;
    },
  },
};
</script>

<style lang="scss"></style>
