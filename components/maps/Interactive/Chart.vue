<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Interactive } from "~/types/Interactive";
import { Chart } from "chart.js/auto";

export default defineComponent({
  name: "PieChart",
  props: {
    risk: {
      type: Object as PropType<Interactive | null>,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null as Chart | null,
      chartOptions: {
        responsive: true,
        normalized: true,
        indexAxis: "y" as const,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  mounted() {
    this.renderCharts(this.risk);
  },
  watch: {
    risk: {
      handler(newRisk: Interactive | null) {
        this.renderCharts(newRisk);
      },
      deep: true,
    },
  },
  methods: {
    renderCharts(risk: Interactive | null) {
      const score = risk?.dangerScore;

      const data = {
        labels: ["Small", "Medium", "High", "Very High"],
        datasets: [
          {
            data: [score?.small, score?.medium, score?.high, score?.danger],
            backgroundColor: ["#99FC97", "#FFF847", "#FF7E35", "#FF2323"],
            hoverOffset: 4,
          },
        ],
      };

      const pieElement = document.getElementById(
        "bar"
      ) as HTMLCanvasElement | null;

      if (pieElement) {
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        // @ts-ignore
        this.chartInstance = new Chart(pieElement, {
          type: "bar",
          data,
          options: this.chartOptions,
        });
      }
    },
  },
});
</script>

<template>
  <canvas id="bar"></canvas>
</template>
