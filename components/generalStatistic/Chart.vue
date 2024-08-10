<script lang="ts">
import { defineComponent, toRaw } from "vue";
import type { PropType } from "vue";
import type { Statistic } from "~/types/Statistic";
import { Chart } from "chart.js/auto";

export default defineComponent({
  name: "BarChart",
  props: {
    statistics: {
      type: Object as PropType<Statistic | null>,
      required: true,
    },
  },
  data() {
    return {
      datasetStatistic: "avgMag",
      chartOptions: {
        responsive: true,
        normalized: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      avgMagChartInstance: null as Chart | null,
      avgDepthChartInstance: null as Chart | null,
      totalChartInstance: null as Chart | null,
    };
  },
  mounted() {
    this.renderCharts(this.statistics);

    // Watch for changes in datasetStatistic and update the chart
    this.$watch(
      () => this.datasetStatistic,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          this.toggleCharts();
        }
      }
    );

    // Optionally watch for changes in statistics and update the charts
    this.$watch(
      () => this.statistics,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          this.renderCharts(newVal);
        }
      },
      { deep: true }
    );
  },
  methods: {
    toggleCharts() {
      const avgMagCanvas = this.$refs.avgMagChart as HTMLCanvasElement;
      const avgDepthCanvas = this.$refs.avgDepthChart as HTMLCanvasElement;
      const totalCanvas = this.$refs.totalChart as HTMLCanvasElement;

      avgMagCanvas.style.display =
        this.datasetStatistic === "avgMag" ? "block" : "none";
      avgDepthCanvas.style.display =
        this.datasetStatistic === "avgDepth" ? "block" : "none";
      totalCanvas.style.display =
        this.datasetStatistic === "total" ? "block" : "none";
    },
    renderCharts(statistics: Statistic | null) {
      const stats = toRaw(statistics)?.data ?? [];

      const createChartData = (data: number[]) => {
        return {
          labels,
          datasets: [
            {
              data,
              backgroundColor: "#8ED1FE",
              borderColor: "#8ED1FE",
              hoverBackgroundColor: "#1D3748",
            },
          ],
        };
      };

      const labels = stats.map((statistic) => statistic.label);
      const avgMag = stats.map(
        (statistic) => statistic.statistics.averageMagnitude
      );
      const avgDepth = stats.map(
        (statistic) => statistic.statistics.averageDepth
      );
      const total = stats.map(
        (statistic) => statistic.statistics.totalEarthquakes
      );

      const avgMagData = createChartData(avgMag);
      const avgDepthData = createChartData(avgDepth);
      const totalData = createChartData(total);

      const createChart = (ctx: CanvasRenderingContext2D | null, data: any) => {
        if (ctx) {
          if (this.avgMagChartInstance) {
            this.avgMagChartInstance.destroy();
          }
          new Chart(ctx, {
            type: "bar",
            data,
            options: this.chartOptions,
          });
        }
      };

      createChart(
        (this.$refs.avgMagChart as HTMLCanvasElement)?.getContext("2d"),
        avgMagData
      );
      createChart(
        (this.$refs.avgDepthChart as HTMLCanvasElement)?.getContext("2d"),
        avgDepthData
      );
      createChart(
        (this.$refs.totalChart as HTMLCanvasElement)?.getContext("2d"),
        totalData
      );

      this.toggleCharts();
    },
  },
  beforeUnmount() {
    // Cleanup chart instances on component unmount
    if (this.avgMagChartInstance) {
      this.avgMagChartInstance.destroy();
    }
    if (this.avgDepthChartInstance) {
      this.avgDepthChartInstance.destroy();
    }
    if (this.totalChartInstance) {
      this.totalChartInstance.destroy();
    }
  },
});
</script>

<template>
  <div class="my-5">
    <button
      @click="datasetStatistic = 'avgMag'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'avgMag' }"
      class="py-2 px-3 text-sm md:py-2 md:px-5 md:text-base border border-[#303D45] rounded-l-3xl"
    >
      Avg. Magnitude
    </button>
    <button
      @click="datasetStatistic = 'avgDepth'"
      :class="{
        'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'avgDepth',
      }"
      class="py-2 px-3 text-sm md:py-2 md:px-5 md:text-base border border-[#303D45]"
    >
      Avg. Depth
    </button>
    <button
      @click="datasetStatistic = 'total'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'total' }"
      class="py-2 px-3 text-sm md:py-2 md:px-5 md:text-base border border-[#303D45] rounded-r-3xl"
    >
      Total Earthquake
    </button>
    <div class="my-8">
      <canvas v-show="datasetStatistic === 'avgMag'" ref="avgMagChart"></canvas>
      <canvas
        v-show="datasetStatistic === 'avgDepth'"
        ref="avgDepthChart"
      ></canvas>
      <canvas v-show="datasetStatistic === 'total'" ref="totalChart"></canvas>
    </div>
  </div>
</template>
