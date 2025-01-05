<template>
  <b-card no-body class="card-revenue-budget p-2">
    <h4 class="card-title mb-100">{{ title }}</h4>
    <vue-apex-charts
      ref="chart"
      id="revenue-report-chart"
      type="donut"
      width="100%"
      :options="options"
      :series="series"
      height="300"
    />
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";

export default {
  components: {
    VueApexCharts,
    BDropdown,
    BDropdownItem,
    BCard,
    BButton,
    BRow,
    BCol,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        chart: {
          type: "donut",
          toolbar: { show: false },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + "%"; // Hiển thị phần trăm
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        labels: [],
        colors: [
          $themeColors.info,
          $themeColors.warning,
          $themeColors.danger,
          $themeColors.success,
          $themeColors.secondary,
          $themeColors.dark,
          $themeColors.light,
          $themeColors.muted,
          $themeColors.accent,
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "center",
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString("vi-VN") + " VND"; // Định dạng số và thêm đơn vị
            },
          },
        },
      },
      series: [], // Dữ liệu sẽ được cập nhật từ `data.series`
    };
  },
  mounted() {
    this.updateChartData(this.data.labels, this.data.series);
  },
  methods: {
    updateChartData(labels, series) {
      this.$refs.chart.updateOptions({
        labels: labels,
        series: series,
      });
      // this.options.labels = labels;
      // this.series = series;
    },
  },
};
</script>
