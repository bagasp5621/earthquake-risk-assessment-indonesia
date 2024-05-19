<script lang="ts">
import type { PropType } from "vue";
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
      type: Object as PropType<Statistic | null>,
      required: true,
    },
  },
  data() {
    return {
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
      datasetStatistic: "avgMag",
    };
  },
  computed: {
    chartData() {
      const statisticsRaw = toRaw(this.statistics)?.data;
      if (!statisticsRaw) return { labels: [], datasets: [] };

      let labels = [];
      let data = [];
      for (const statistic of statisticsRaw) {
        labels.push(statistic.label);
        data.push(statistic.statistics.averageMagnitude);

        switch (this.datasetStatistic) {
          case "avgMag":
            data.push(statistic.statistics.averageMagnitude);
            break;
          case "avgDepth":
            data.push(statistic.statistics.averageDepth);
            break;
          case "total":
            data.push(statistic.statistics.totalEarthquakes);
            break;
          default:
            data.push(statistic.statistics.averageMagnitude);
        }
      }

      return { labels, datasets: [{ data, backgroundColor: "#8ED1FE" }] };
    },
  },
};
</script>

<template>
  <div class="my-5">
    <button
      @click="datasetStatistic = 'avgMag'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'avgMag' }"
      class="py-2 px-5 border border-[#303D45] rounded-l-3xl"
    >
      Avg. Magnitude
    </button>
    <button
      @click="datasetStatistic = 'avgDepth'"
      :class="{
        'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'avgDepth',
      }"
      class="py-2 px-5 border border-[#303D45]"
    >
      Avg. Depth
    </button>
    <button
      @click="datasetStatistic = 'total'"
      :class="{ 'bg-[#303D45] text-[#8ED1FE]': datasetStatistic === 'total' }"
      class="py-2 px-5 border border-[#303D45] rounded-r-3xl"
    >
      Total Earthquake
    </button>
  </div>
  <Bar id="earthquake-statistics" :options="chartOptions" :data="chartData" />
</template>
