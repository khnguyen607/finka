<template>
  <div>
    <b-card p-5>
      <b-card-header>
        <!-- <b-card-title>Mã cổ phiếu khuyến nghị</b-card-title> -->
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
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col sm="6">
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
          <b-col sm="6">
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
    vSelect,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        dateFrom: null,
        dateTo: null,
        rcmLikedListSelected: [],
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
          },
          tdClass: "text-nowrap",
        },
        {
          label: "Ngành",
          field: "field",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
        },
        {
          label: "Thị giá",
          field: "price",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
        },
        {
          label: "Lệnh mua/bán",
          field: "rcm",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
        },
        {
          label: "Tỷ lệ mua/bán",
          field: "bsRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
          formatFn: (value) => {
            return value + "%";
          },
        },
        {
          label: "Chu kỳ mua/bán",
          field: "bsCycle",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
        },
        {
          label: "P/E",
          field: "pte",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
        },
        {
          label: "P/B",
          field: "ptb",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
        },
        {
          label: "ROE",
          field: "roe",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
            filterValue: "",
          },
          formatFn: (value) => {
            return value + "%";
          },
        },
      ],
      rows: [],
      rcmLikedList: [],
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
  },
  async created() {
    await this.initSearchData();
    await this.getRcmLikedList();
    await this.getData();
  },
  methods: {
    async getData() {
      await this.$callApi
        .post("/api/stockpicks/date", {
          dateFrom: this.searchData.dateFrom,
          dateTo: this.searchData.dateTo,
          codes: this.searchData.rcmLikedListSelected,
          sortBy: ["date desc"],
        })
        .then((res) => {
          const data = res.data.data;
          this.rows = data.sort((a, b) => b.id - a.id);
          this.rows = data;
        });
      await this.$callApi.put("/api/users/addCodeLiked/" + this.userData.id, {
        codeLiked: JSON.stringify(this.searchData.rcmLikedListSelected),
      });
    },
    async getRcmLikedList() {
      await this.$callApi.get("/api/stockpicks/codes").then((res) => {
        this.rcmLikedList = res.data.data.map((item) => {
          return { label: item.code, value: item.code, id: item.code };
        });
      });
    },
    async initSearchData() {
      const today = new Date();
      let dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
      dateFrom.setDate(dateFrom.getDate() + 1);
      dateFrom = dateFrom.toISOString().split("T")[0];
      const dateTo = today.toISOString().split("T")[0];
      this.searchData.dateFrom = dateFrom;
      this.searchData.dateTo = dateTo;

      await this.$callApi.get("/api/users/" + this.userData.id).then((res) => {
        const data = JSON.parse(res.data.data.codeLiked);
        data.forEach((item) => {
          this.searchData.rcmLikedListSelected.push(item);
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
