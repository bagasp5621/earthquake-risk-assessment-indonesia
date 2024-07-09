<script lang="ts">
import type { Statistic } from "~/types/Statistic";

export default {
  name: "SummaryStat",
  props: {
    statistics: {
      type: Object as PropType<Statistic | null>,
      required: true,
    },
  },
  data() {
    return {
      isHovered: [false, false, false, false],
    };
  },
  computed: {
    summary() {
      const summary = toRaw(this.statistics)?.summary;
      const summaryObj = [
        {
          title: "Total Earthquakes",
          value: summary?.totalEarthquakes,
          pronounce: "Eq",
          description: `Earthquake data was taken from the BMKG's official website. The total number of earthquakes taken was ${summary?.totalEarthquakes}.`,
        },
        {
          title: "Total Clusters",
          value: summary?.largestCluster,
          pronounce: "Cluster",
          description: `The calculation was carried out using the K-Means algorithm which resulted in ${summary?.largestCluster} clusters. The results of this calculation show that the larger the cluster, the greater the average size of the earthquake magnitude.`,
        },
        {
          title: "Total Years",
          value: summary?.totalYears.years,
          pronounce: "Years",
          description: `The data taken starts from ${summary?.totalYears.firstData} to ${summary?.totalYears.lastData}. Making a total of ${summary?.totalYears.years} years.`,
        },
        {
          title: "Largest Earthquake",
          value: summary?.largestEarthquake.magnitude,
          pronounce: "RS",
          description: `The largest earthquake occurred in ${summary?.largestEarthquake.location} with a magnitude of ${summary?.largestEarthquake.magnitude} RS (${summary?.largestEarthquake.datetime}). it was measured from ${summary?.totalYears.firstData} to ${summary?.totalYears.lastData}.`,
        },
      ];

      return summaryObj;
    },
  },
};
</script>

<template>
  <div
    v-for="(item, index) in summary"
    :key="index"
    class="max-h-[160px] overflow-hidden"
  >
    <div
      @mouseover="isHovered[index - 1] = true"
      @mouseleave="isHovered[index - 1] = false"
    >
      <div
        v-if="!isHovered[index - 1]"
        class="bg-[#8ED1FE] mt-2 p-5 rounded-2xl max-h-[160px] overflow-hidden"
      >
        <p class="text-lg text-black font-semibold">
          {{ item.title }}
        </p>
        <div class="mt-12">
          <div class="text-end text-black">
            <div class="border-l-2 border-black">
              <p>
                <span class="text-3xl font-black">
                  {{ item.value }}
                </span>
                {{ " " }}
                <span class="text-lg font-semibold">
                  {{ item.pronounce }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bg-[#1D3748] mt-2 p-5 rounded-2xl max-h-[152px] overflow-hidden"
      >
        <div class="text-xs border-l-2 border-[#DDDDDD] min-h-[110px] pl-2">
          <p>
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
