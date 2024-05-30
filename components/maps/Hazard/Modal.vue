<script lang="ts">
import type { PropType } from "vue";
import type { EarthquakeData } from "~/types/Earthquake";

export default {
  props: {
    cluster: {
      type: Object as PropType<EarthquakeData>,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    formatDate(epochDate: number, includeTime: boolean) {
      const date = new Date(epochDate);

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      if (includeTime) {
        return `${dayName}  ${day}/${monthName}/${year} ${hours}:${minutes}:${seconds}`;
      }
      return `${dayName}  ${day}/${monthName}/${year}`;
    },
  },
};
</script>
<template>
  <div class="bg-[#1D1F25] flex flex-col overflow-y-auto">
    <div class="flex justify-between">
      <div class="m-4 font-extrabold text-xl">Heatmap Details</div>
      <div class="m-4">
        <button
          @click="closeModal"
          class="py-[0.1rem] px-1.5 border rounded-lg hover:bg-[#4b5052] text-xs"
        >
          X
        </button>
      </div>
    </div>
    <!-- summary -->
    <div>
      <div class="flex justify-between m-2">
        <div>Total Earthquakes</div>
        <div class="text-[#FF7E35] font-bold">
          {{ cluster?.totalEarthquakes }} Eq
        </div>
      </div>
      <div class="flex justify-between m-2">
        <div>Average Magnitude</div>
        <div class="text-[#FF7E35] font-bold">{{ cluster?.avgMag.toFixed(2) }} RS</div>
      </div>
      <div class="flex justify-between m-2">
        <div>Average Depth</div>
        <div class="text-[#FF7E35] font-bold">{{ cluster?.avgDepth.toFixed(1) }} Km</div>
      </div>
    </div>
    <!-- table -->
    <div>
      <p class="m-2 mt-4 font-extrabold text-lg">Earthquake History Table</p>
      <table
        class="table-auto w-full border-collapse border-t border-b border-[#5C5C5C] mx-2"
      >
        <thead>
          <tr>
            <th class="border-t border-b border-[#5C5C5C] text-sm py-2">No</th>
            <th class="border-t border-b border-[#5C5C5C] text-sm">Mag</th>
            <th class="border-t border-b border-[#5C5C5C] text-sm">Depth</th>
            <th class="border-t border-b border-[#5C5C5C] text-sm">Latitude</th>
            <th class="border-t border-b border-[#5C5C5C] text-sm">
              Longitude
            </th>
            <th class="border-t border-b border-[#5C5C5C] text-sm">Datetime</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cluster?.earthquakes" :key="index">
            <td class="border-b border-[#5C5C5C] text-sm py-1">
              {{ index + 1 }}
            </td>
            <td class="border-b border-[#5C5C5C] text-sm">
              {{ item.magnitude.toFixed(2) }}
            </td>
            <td class="border-b border-[#5C5C5C] text-sm">
              {{ item.depth.toFixed(1) }}
            </td>
            <td class="border-b border-[#5C5C5C] text-sm">
              {{ item.latitude.toFixed(5) }}
            </td>
            <td class="border-b border-[#5C5C5C] text-sm">
              {{ item.longitude.toFixed(5) }}
            </td>
            <td class="border-b border-[#5C5C5C] text-sm">
              {{ formatDate(item.datetime, false) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
