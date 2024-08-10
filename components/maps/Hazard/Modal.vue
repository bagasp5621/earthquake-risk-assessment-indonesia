<script lang="ts">
import type { PropType } from "vue";
import type { EarthquakeData } from "~/types/Earthquake";
import { mkConfig, generateCsv, download } from "export-to-csv";

interface CSVInterface {
  [key: string]: number | string;
  no: number;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  datetime: string;
  totalVibrations: number;
}

export default {
  props: {
    cluster: {
      type: Object as PropType<EarthquakeData>,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 100,
    };
  },
  computed: {
    paginatedData() {
      if (this.cluster?.earthquakes) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.cluster.earthquakes.slice(start, end);
      }
      return [];
    },
    totalPages() {
      if (this.cluster?.earthquakes) {
        return Math.ceil(this.cluster.earthquakes.length / this.itemsPerPage);
      }
      return 0;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    formatDate(epochDate: number, includeTime: boolean = false) {
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
    downloadCSV() {
      const csvConfig = mkConfig({
        useKeysAsHeaders: true,
        filename: `Earthquake Data`,
      });

      let earthquakeCSV: CSVInterface[] = [];

      this.cluster?.earthquakes.map((earthquake, index) => {
        let eqData: CSVInterface = {
          no: index + 1,
          magnitude: earthquake.magnitude,
          depth: earthquake.depth,
          latitude: earthquake.latitude,
          longitude: earthquake.longitude,
          datetime: this.formatDate(earthquake.datetime),
          totalVibrations: earthquake.phasecount,
        };

        earthquakeCSV.push(eqData);
      });

      const csv = generateCsv(csvConfig)(earthquakeCSV);

      download(csvConfig)(csv);
    },
  },
};
</script>

<template>
  <div class="bg-[#1D1F25] flex flex-col overflow-x-hidden">
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
        <div class="text-[#FF7E35] font-bold">
          {{ cluster?.avgMag.toFixed(2) }} RS
        </div>
      </div>
      <div class="flex justify-between m-2">
        <div>Average Depth</div>
        <div class="text-[#FF7E35] font-bold">
          {{ cluster?.avgDepth.toFixed(1) }} Km
        </div>
      </div>
    </div>
    <!-- table -->
    <div class="flex justify-between">
      <p class="m-2 mt-4 font-extrabold text-lg">Earthquake History Table</p>
      <p
        @click="downloadCSV"
        class="m-2 mt-4 py-2 px-2 md:px-2 rounded-xl cursor-pointer bg-[#303D45] text-[#8ED1FE] hover:bg-[#212a30]"
      >
        Download as CSV
      </p>
    </div>
    <div class="overflow-y-auto overflow-x-hidden">
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
            <th class="border-t border-b border-[#5C5C5C] text-sm">
              Vibrations
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td class="border-b border-[#5C5C5C] text-sm py-1">
              {{ index + 1 + (currentPage - 1) * itemsPerPage }}
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
            <td class="border-b border-[#5C5C5C] text-sm">
              {{ item.phasecount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination Controls -->
    <div class="flex justify-between m-4">
      <button
        @click="currentPage > 1 && currentPage--"
        :disabled="currentPage === 1"
        class="py-1 px-2 border rounded-lg hover:bg-[#4b5052] text-xs"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="currentPage < totalPages && currentPage++"
        :disabled="currentPage === totalPages"
        class="py-1 px-2 border rounded-lg hover:bg-[#4b5052] text-xs"
      >
        Next
      </button>
    </div>
  </div>
</template>
