<script lang="ts">
import type { Statistic } from "~/types/Statistic";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { _backgroundColor } from "#tailwind-config/theme";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
ChartJS.defaults.borderColor = "#DDDDDD";

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    statistics: {
      type: Object as PropType<Statistic | undefined>,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
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

      datasetStatistic: "mag",
    };
  },
  computed: {
    chartData() {
      const statisticsRaw = toRaw(this.statistics)?.data;
      const chartData = {
        labels: [] as number[],
        datasets: [
          {
            data: [] as number[],
            backgroundColor: "#8ED1FE",
          },
        ],
      };
      if (statisticsRaw) {
        chartData.labels = statisticsRaw.map((statistic) => statistic.label);
        chartData.datasets[0].data = statisticsRaw.map((statistic) => {
          switch (this.datasetStatistic) {
            case "mag":
              return statistic.statistics.averageMagnitude;
            case "depth":
              return statistic.statistics.averageDepth;
            case "total":
              return statistic.statistics.totalEarthquakes;
            default:
              return statistic.statistics.averageMagnitude;
          }
        });
      }
      return chartData;
    },
  },
};
</script>

<template>
  <div class="my-5">
    <button
      @click="datasetStatistic = 'mag'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'mag' }"
      class="py-2 px-5 border border-[#303D45] rounded-l-3xl"
    >
      Magnitude
    </button>
    <button
      @click="datasetStatistic = 'depth'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'depth' }"
      class="py-2 px-5 border border-[#303D45]"
    >
      Depth
    </button>
    <button
      @click="datasetStatistic = 'total'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'total' }"
      class="py-2 px-5 border border-[#303D45] rounded-r-3xl"
    >
      Total
    </button>
  </div>
  <Bar id="earthquake-statistics" :options="chartOptions" :data="chartData" />
</template>
