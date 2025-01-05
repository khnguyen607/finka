<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col md="12">
        <b-card no-body class="card-statistics">
          <b-card-header>
            <b-card-title>Tổng quan hoạt động kinh doanh</b-card-title>
            <b-card-text
              class="font-small-2 mr-25 mb-0 d-flex align-items-center"
            >
              <b-form-group label="Chọn giá trị:" class="mb-0">
                <b-form-input
                  v-model="selectedDate"
                  id="mc-tern"
                  type="month"
                  @change="refreshDashboard"
                />
              </b-form-group>
            </b-card-text>
          </b-card-header>
        </b-card>
      </b-col>
    </b-row>

    <b-row
      class="match-height justify-content-between"
      style="display: flex; gap: 10px"
    >
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'TỔNG DOANH SỐ (VNĐ)',
            value: normalize(dashboard.totalIncome) || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'SẢN PHẨM WIN (SP)',
            value: dashboard.totalWin || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'NGÂN SÁCH CHI TIÊU (VNĐ)',
            value: normalize(dashboard.totalAds) || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'TỈ LỆ ADS/DOANH THU',
            value: `${dashboard.totalAdsToIncomeRate}%` || 0,
          }"
        />
      </b-col>
      <b-col class="flex-grow-1" style="flex: 1">
        <BasicCard
          :data="{
            name: 'MỨC ĐỘ HOÀN THÀNH MỤC TIÊU',
            value: `${dashboard.completionRate}%` || 0,
          }"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <BasicDonutChart
          :title="charts.totalIncomeByTeam.title"
          :data="charts.totalIncomeByTeam.data"
          :key="charts.totalIncomeByTeam.key"
        />
      </b-col>

      <b-col lg="6">
        <BasicBarChart
          :title="charts.totalWinByTeamColumn.title"
          :data="charts.totalWinByTeamColumn.data"
          :key="charts.totalWinByTeamColumn.key"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="4">
        <BasicBarChart
          :title="charts.totalWinByTeam.title"
          :data="charts.totalWinByTeam.data"
          :key="charts.totalWinByTeam.key"
        />
      </b-col>
      <b-col lg="4">
        <BasicBarChart
          ref="totalAdsByTeamChart"
          :title="charts.totalAdsByTeam.title"
          :data="charts.totalAdsByTeam.data"
          :key="charts.totalAdsByTeam.key"
        />
      </b-col>
      <b-col lg="4">
        <BasicBarRateChart
          ref="totalAdsRateByTeamChart"
          :title="charts.totalAdsRateByTeam.title"
          :data="charts.totalAdsRateByTeam.data"
          :key="charts.totalAdsRateByTeam.key"
        />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="12">
        <BasicLineChart
          :title="charts.totalIncomeByTeamDaily.title"
          :data="charts.totalIncomeByTeamDaily.data"
          :key="charts.totalIncomeByTeamDaily.key"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <EmployeeChart
          :title="employee.best.title"
          :data="employee.best.data"
        />
      </b-col>
      <b-col lg="6">
        <EmployeeChart
          :title="employee.worst.title"
          :data="employee.worst.data"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <BasicBarChart
          :title="charts.incomeCompletion.title"
          :data="charts.incomeCompletion.data"
          :key="charts.incomeCompletion.key"
        />
      </b-col>

      <b-col lg="6">
        <BasicBarRateChart
          :title="charts.incomeCompletionRate.title"
          :data="charts.incomeCompletionRate.data"
          :key="charts.incomeCompletionRate.key"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <BasicBarChart
          :title="charts.incomeUserRank.title"
          :data="charts.incomeUserRank.data"
          :key="charts.incomeUserRank.key"
          :height="600"
        />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BButton,
  BFormInput,
  BFormSelect,
  BFormGroup,
} from "bootstrap-vue";

import { getUserData } from "@/auth/utils";
import BasicLineChart from "./BasicLineChart.vue";
import BasicBarChart from "./BasicBarChart.vue";
import BasicBarRateChart from "./BasicBarRateChart.vue";
import BasicDonutChart from "./BasicDonutChart.vue";
import EmployeeChart from "./EmployeeChart.vue";
import BasicCard from "./BasicCard.vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BButton,
    EmployeeChart,
    BasicLineChart,
    BasicBarChart,
    BasicBarRateChart,
    BasicDonutChart,
    BasicCard,
    BFormInput,
    BFormSelect,
    BFormGroup,
  },
  data() {
    return {
      selectedDate: new Date().toISOString().slice(0, 7),
      dashboard: {
        totalIncome: 0,
        totalWin: 0,
        totalAds: 0,
        totalAdsToIncomeRate: 0,
        completionRate: 0,
      },
      charts: {
        totalIncomeByTeam: {
          title: "Tổng doanh số theo team",
          data: {
            series: [],
            labels: [],
          },
          key: 0,
        },
        totalWinByTeamColumn: {
          title: "Tổng doanh số theo team",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalIncomeByTeamDaily: {
          title: "Biểu đồ biến động doanh số theo ngày",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalWinByTeam: {
          title: "So sánh số sản phẩm win giữa các team",
          data: {
            series: [
              {
                name: "Sản phẩm win",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalAdsByTeam: {
          title: "Chi phí marketing theo team",
          data: {
            series: [
              {
                name: "Chi phí marketing",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        totalAdsRateByTeam: {
          title: "Tỉ lệ ads theo team",
          data: {
            series: [
              {
                name: "Tỉ lệ ads (%)",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        incomeCompletion: {
          title: "Doanh số sau ship và so với kế hoạch",
          data: {
            series: [
              {
                name: "Thực tế",
                data: [],
              },
              {
                name: "Kế hoạch",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
        incomeCompletionRate: {
          title: "Tỉ lệ hoàn thành mục tiêu theo team",
          data: {
            series: [
              {
                name: "Tỉ lệ (%)",
                data: [],
              },
            ],
            categories: [],
          },
        },
        incomeUserRank: {
          title: "Thống kê doanh số Người dùng trong tháng",
          data: {
            series: [
              {
                name: "Doanh số",
                data: [],
              },
            ],
            categories: [],
          },
          key: 0,
        },
      },
      employee: {
        best: {
          title: "Top 5 Người dùng doanh số cao nhất",
          data: [],
        },
        worst: {
          title: "Top 5 Người dùng doanh số thấp nhất",
          data: [],
        },
      },
      rawData: {},
      rawDataDaily: {},
      rawUserData: {},
    };
  },
  async created() {
    await this.refreshDashboard();
  },
  methods: {
    async refreshDashboard() {
      this.getDashboard();
      this.getChartData();
      this.getEmployeeData();
    },
    async getDashboard() {
      await this.$callApi
        .post("/api/getReports/getDashboard", {
          tern: `${this.selectedDate.split("-")[1]}/${
            this.selectedDate.split("-")[0]
          }`,
        })
        .then((res) => {
          const data = res.data.data;
          if (data) {
            this.dashboard = data;
          } else {
            this.dashboard = {
              totalIncome: 0,
              totalWin: 0,
              totalAds: 0,
              totalAdsToIncomeRate: 0,
              completionRate: 0,
            };
          }
        });
    },
    async getChartData() {
      await this.$callApi
        .get("/api/getReports/marketingTeamMonth")
        .then((res) => {
          const data = res.data.data;
          this.rawData = data.filter(
            (item) =>
              item.tern ===
              `${this.selectedDate.split("-")[1]}/${
                this.selectedDate.split("-")[0]
              }`
          );
        });
      await this.$callApi
        .post("/api/getReports/getIncomeDaily", {
          tern: this.selectedDate,
        })
        .then((res) => {
          const data = res.data.data;
          this.rawDataDaily = data;
        });
      await this.updateChartData();
    },
    async getEmployeeData() {
      await this.$callApi.get("/api/getReports/marketingMonth").then((res) => {
        const data = res.data.data;
        this.rawUserData = data.filter(
          (item) =>
            item.tern ===
            `${this.selectedDate.split("-")[1]}/${
              this.selectedDate.split("-")[0]
            }`
        );
        // Lọc ra dữ liệu chỉ thuộc kỳ
        const filteredData = this.rawUserData;
        // Sắp xếp theo income giảm dần
        const sortedByIncomeDesc = [...filteredData].sort(
          (a, b) => b.incomeNet - a.incomeNet
        );
        // Sắp xếp theo income tăng dần
        const sortedByIncomeAsc = [...filteredData].sort(
          (a, b) => a.incomeNet - b.incomeNet
        );
        // Lấy top 5 Người dùng có income cao nhất
        const topHighestIncome = sortedByIncomeDesc.slice(0, 5);
        // Lấy top 5 Người dùng có income thấp nhất
        const topLowestIncome = sortedByIncomeAsc.slice(0, 5);

        this.employee.best.data = topHighestIncome;
        this.employee.worst.data = topLowestIncome;
      });
    },
    async updateChartData() {
      // clear data
      this.charts.totalIncomeByTeam.data.series = [];
      this.charts.totalIncomeByTeam.data.labels = [];
      this.charts.totalWinByTeamColumn.data.series[0].data = [];
      this.charts.totalWinByTeamColumn.data.categories = [];
      this.charts.totalWinByTeam.data.series[0].data = [];
      this.charts.totalWinByTeam.data.categories = [];
      this.charts.totalAdsByTeam.data.series[0].data = [];
      this.charts.totalAdsByTeam.data.categories = [];
      this.charts.totalAdsRateByTeam.data.series[0].data = [];
      this.charts.totalAdsRateByTeam.data.categories = [];
      this.charts.incomeCompletion.data.series[0].data = [];
      this.charts.incomeCompletion.data.series[1].data = [];
      this.charts.incomeCompletion.data.categories = [];
      this.charts.incomeCompletionRate.data.series[0].data = [];
      this.charts.incomeCompletionRate.data.categories = [];

      // dump data
      this.rawData.forEach((item) => {
        this.charts.totalIncomeByTeam.data.series.push(Number(item.incomeNet));
        this.charts.totalIncomeByTeam.data.labels.push(item.teamName);

        this.charts.totalWinByTeamColumn.data.series[0].data.push(
          Number(item.incomeNet)
        );
        this.charts.totalWinByTeamColumn.data.categories.push(item.teamName);

        this.charts.totalWinByTeam.data.series[0].data.push(item.win);
        this.charts.totalWinByTeam.data.categories.push(item.teamName);

        this.charts.totalAdsByTeam.data.series[0].data.push(item.ads);
        this.charts.totalAdsByTeam.data.categories.push(item.teamName);

        this.charts.totalAdsRateByTeam.data.series[0].data.push(item.adsRate);
        this.charts.totalAdsRateByTeam.data.categories.push(item.teamName);

        this.charts.incomeCompletion.data.series[0].data.push(item.incomeNet);
        this.charts.incomeCompletion.data.series[1].data.push(item.income);
        this.charts.incomeCompletion.data.categories.push(item.teamName);

        this.charts.incomeCompletionRate.data.series[0].data.push(
          item.completionRate
        );
        this.charts.incomeCompletionRate.data.categories.push(item.teamName);
      });
      // refreshData
      this.charts.totalIncomeByTeam.key += 1;
      this.charts.totalWinByTeamColumn.key += 1;
      this.charts.totalWinByTeam.key += 1;
      this.charts.totalAdsByTeam.key += 1;
      this.charts.totalAdsRateByTeam.key += 1;
      this.charts.incomeCompletion.key += 1;
      this.charts.incomeCompletionRate.key += 1;

      // CHART DAILY
      this.charts.totalIncomeByTeamDaily.data.series[0].data = [];
      this.charts.totalIncomeByTeamDaily.data.categories = [];
      this.rawDataDaily.forEach((item) => {
        this.charts.totalIncomeByTeamDaily.data.series[0].data.push(
          item.income
        );
        this.charts.totalIncomeByTeamDaily.data.categories.push(
          item.date.split("T")[0].split("-")[2]
        );
      });
      this.charts.totalIncomeByTeamDaily.key += 1;

      // CHART USER RANK
      this.charts.incomeUserRank.data.series[0].data = [];
      this.charts.incomeUserRank.data.categories = [];
      this.rawUserData.forEach((item) => {
        this.charts.incomeUserRank.data.series[0].data.push(item.incomeNet);
        this.charts.incomeUserRank.data.categories.push(item.userName);
      });
      this.charts.incomeUserRank.key += 1;
    },
    normalize(data) {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
