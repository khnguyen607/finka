<template>
  <div>

    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-form-group
          label="Lựa chọn cổ phiếu yêu thích"
          label-for="mc-rcm-liked"
        >
          <v-select
            v-model="searchData.rcmLikedListSelected"
            id="mc-rcm-liked"
            :options="rcmLikedList"
            :reduce="(option) => option.id"
            multiple
            :clearable="false"
            @input="getData"
          />
        </b-form-group>
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
            :columns="filteredColumns"
            :rows="rows"
            :pagination-options="{
              enabled: true,
              perPage: pageLength,
            }"
            @on-cell-click="onClickCode"
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
      <RcmLikedHideData
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
import RcmLikedHideData from "./rcm-liked-hide-data.vue";
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
    RcmLikedHideData,
    vSelect,
  },
  data() {
    return {
      tableId: 1,
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        dateFrom: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        dateTo: new Date().toISOString().split("T")[0],
        rcmLikedListSelected: [],
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
      rcmLikedList: [],
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
    await this.$callApi.get("/api/users/" + this.userData.id).then((res) => {
      const data = JSON.parse(res.data.data.codeLiked);
      data.forEach((item) => {
        this.searchData.rcmLikedListSelected.push(item);
      });
    });

    await this.getRcmLikedList();
    await this.getColumns();
    await this.getData();
  },
  methods: {
    async getRcmLikedList() {
      const data = await getRows(this.$callApi, {
        tableId: 4,
      });
      data.forEach((item) => {
        this.rcmLikedList.push({
          value: item.code,
          label: item.code,
          id: item.code,
        });
      });
    },
    onClickCode(params) {
      if (params.column.field == "code") {
        this.$router.push(`/reports/stock-details/list/${params.row.code}`);
      }
    },
    initModalFilter() {
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
    openFilter() {
      Object.keys(this.tempFilters).forEach((key) => {
        delete this.tempFilters[key].value;
      });
      this.showFilterModal = true;
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
        if (item.key == "code") {
          column["tdClass"] = "text-primary cursor-pointer";
        }
        switch (item.dataType) {
          case "date":
            column = {
              ...column,
              type: "date",
              dateInputFormat: "yyyy-MM-dd HH:mm:ss",
              dateOutputFormat: "dd/MM/yyyy",
            };
            break;
          case "number":
            column = {
              ...column,
              type: "number",
            };
            break;
          case "rate":
            column = {
              ...column,
              type: "number",
              formatFn: (value) => value + "%",
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
      await this.$callApi.put("/api/users/addCodeLiked/" + this.userData.id, {
        codeLiked: JSON.stringify(this.searchData.rcmLikedListSelected),
      });

      const params = {
        tableId: this.tableId,
        dateFrom: this.searchData.dateFrom,
        dateTo: this.searchData.dateTo,
        codes: this.searchData.rcmLikedListSelected,
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
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
