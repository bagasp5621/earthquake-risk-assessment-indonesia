<script lang="ts">
import { useContentStore } from "~/store/ContentState";
import { useHazardStore } from "~/store/HazardState";
import { getFilter } from "~/api/filterApi";
import type { EarthquakeData } from "~/types/Earthquake";

export default {
  name: "FilterModal",
  data() {
    return {
      filterModal: false,
      loading: false,
      north: 6,
      south: -11,
      east: 141,
      west: 95,
      year: 2024,
      startDate: "",
      endDate: "",
      minMag: 0,
      maxMag: 10,
      minDepth: 0,
      maxDepth: 1000,
      earthquake: undefined as EarthquakeData | undefined,
      advanceDateFilter: true as Boolean,
    };
  },
  setup() {
    const contentStore = useContentStore();

    return {
      content: contentStore.content,
      removeContent: contentStore.removeContent,
      showContent: contentStore.showContent,
    };
  },
  created() {
    this.startDate = this.formatDate(1714521600000); // 1 May 2024
    this.endDate = this.formatDate(1717174800000); // 1 June 2024
  },
  methods: {
    formatDate(epoch: number): string {
      const date = new Date(epoch);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    parseDate(dateString: string): number {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    },
    removeFilterModal() {
      this.filterModal = false;
    },
    showFilterModal() {
      this.filterModal = true;
    },
    earthquakeWeight(magnitude: number) {
      if (magnitude < 4) {
        return 0.2;
      } else if (magnitude >= 4 && magnitude < 5) {
        return 0.5;
      } else if (magnitude >= 5 && magnitude < 6) {
        return 0.7;
      } else {
        return 1;
      }
    },
    async filterAction() {
      const { insertHazard } = useHazardStore();
      this.loading = true;

      this.removeContent();
      try {
        let startDate: number;
        let endDate: number;

        // check if advance filter is on
        if (this.advanceDateFilter) {
          let startEpoch = new Date(this.year, 0, 1);
          let endEpoch = new Date(this.year, 11, 31);

          startDate = startEpoch.getTime();
          endDate = endEpoch.getTime();

          if (this.minMag < 5) {
            this.minMag = 5;
          }
        } else {
          startDate = this.parseDate(this.startDate);
          endDate = this.parseDate(this.endDate);

          // max one month query
          const oneMonthMs = endDate - 31 * 24 * 60 * 60 * 1000;
          startDate = startDate < oneMonthMs ? oneMonthMs : startDate;
          console.log(startDate);
          console.log(endDate);
        }

        const filter = await getFilter(
          this.north,
          this.south,
          this.west,
          this.east,
          this.minMag,
          this.maxMag,
          this.minDepth,
          this.maxDepth,
          startDate,
          endDate
        );

        let dataToEarthquake: EarthquakeData = {
          avgMag: filter.summary.averageMagnitude,
          avgDepth: filter.summary.averageDepth,
          totalEarthquakes: filter.summary.totalEarthquake,
          earthquakes: filter.data.map((eq) => ({
            latitude: eq.latitude,
            longitude: eq.longitude,
            magnitude: eq.magnitude,
            depth: eq.depth,
            phasecount: eq.phasecount,
            datetime: eq.datetime,
            weight: this.earthquakeWeight(eq.magnitude),
          })),
        };

        insertHazard(dataToEarthquake);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
        this.removeFilterModal();
      }
    },
    changeAdvanceDateFilter() {
      this.advanceDateFilter = !this.advanceDateFilter;
    },
  },
};
</script>

<template>
  <div :class="{ 'inset-0': filterModal }">
    <div @click="showFilterModal">
      <MapsHazardFilterIcon v-if="!filterModal" />
    </div>
    <div v-if="filterModal" class="bg-[#1D1F25] rounded-lg overflow-y-auto">
      <div class="flex m-2 justify-between">
        <div class="m-4">
          <p class="text-xl font-bold">Filter Earthquake</p>
        </div>
        <p
          @click="removeFilterModal"
          class="m-4 py-0.5 px-2 border border-white rounded-lg bg-[#1D1F25] hover:bg-[#303D45] cursor-pointer font-bold"
        >
          X
        </p>
      </div>
      <!-- Radius -->
      <div class="flex flex-col m-2 text-center text-[#F7F7F7]">
        <label for="north">North</label>
        <input
          type="number"
          id="north"
          v-model="north"
          placeholder="north"
          class="rounded-lg bg-[#303D45] py-1 pl-2 mx-40 focus:outline-none"
          required
        />
      </div>
      <div class="flex justify-between mx-4">
        <div>
          <label for="west" class="mr-4">West</label>
          <input
            type="number"
            v-model="west"
            placeholder="west"
            class="rounded-lg bg-[#303D45] py-1 pl-2 mr-10 focus:outline-none"
            required
          />
        </div>
        <div>
          <input
            type="number"
            v-model="east"
            placeholder="east"
            class="rounded-lg bg-[#303D45] py-1 pl-2 focus:outline-none"
            required
          />
          <label for="east" class="ml-4">East</label>
        </div>
      </div>
      <div class="flex flex-col m-2 text-center">
        <input
          type="number"
          id="south"
          v-model="south"
          placeholder="south"
          class="rounded-lg bg-[#303D45] py-1 pl-2 mx-40 focus:outline-none"
          required
        />
        <label for="south">South</label>
      </div>
      <div
        :class="{
          'bg-[#1D1F25] hidden ': !advanceDateFilter,
        }"
        class="m-4"
      >
        <label for="years">Choose Year to Select:</label>
        <div class="my-2">
          <select
            v-model="year"
            name="years"
            id="years"
            class="bg-[#303D45] px-3 rounded-xl"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
          </select>
        </div>
      </div>
      <p
        @click="changeAdvanceDateFilter"
        class="bg-[#303D45] rounded-sm mx-4 hover:bg-[#435561] flex justify-center cursor-pointer"
      >
        <MapsHazardArrow :class="{ 'rotate-180': advanceDateFilter }" />
      </p>

      <div
        :class="{
          'bg-[#1D1F25] hidden': advanceDateFilter,
        }"
      >
        <div class="grid grid-cols-2 text-[#F7F7F7] mx-4 mt-5">
          <div class="flex flex-col">
            <label for="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2 focus:outline-none"
              v-model="startDate"
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="endDate">End Date </label>
            <input
              type="date"
              id="endDate"
              class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2 focus:outline-none"
              v-model="endDate"
              required
            />
          </div>
        </div>

        <span class="text-xs mx-4 mt-5"> *Max 31 days</span>
      </div>

      <!-- Magnitude -->
      <div
        :class="{
          'bg-[#1D1F25] hidden': advanceDateFilter,
        }"
        class="grid grid-cols-2 text-[#F7F7F7] mx-4 mt-5"
      >
        <div class="flex flex-col">
          <label for="minMag">Min Magnitude</label>
          <input
            type="number"
            id="minMag"
            placeholder="Min Magnitude"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2 focus:outline-none"
            v-model="minMag"
            required
          />
        </div>
        <div
          :class="{
            'bg-[#1D1F25] hidden': advanceDateFilter,
          }"
          class="flex flex-col"
        >
          <label for="maxMag">Max Magnitude</label>
          <input
            type="number"
            id="maxMag"
            placeholder="Max Magnitude"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2 focus:outline-none"
            v-model="maxMag"
            required
          />
        </div>
      </div>

      <!-- Depth -->
      <div
        :class="{
          'bg-[#1D1F25] hidden': advanceDateFilter,
        }"
        class="grid grid-cols-2 text-[#F7F7F7] mx-4 mt-5"
      >
        <div class="flex flex-col">
          <label for="minDepth">Min Depth (Km)</label>
          <input
            type="number"
            id="maxDepth"
            placeholder="Max Depth"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2 focus:outline-none"
            v-model="minDepth"
            required
          />
        </div>
        <div
          :class="{
            'bg-[#1D1F25] hidden': advanceDateFilter,
          }"
          class="flex flex-col"
        >
          <label for="maxDepth">Max Depth (Km)</label
          ><input
            type="number"
            id="minDepth"
            placeholder="Min Depth"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2 focus:outline-none"
            v-model="maxDepth"
            required
          />
        </div>
      </div>

      <!-- Filter Button -->
      <div class="flex justify-end mr-5 mt-5">
        <button
          @click="filterAction"
          class="py-1.5 px-5 rounded-2xl bg-[#8ED1FE] text-black font-bold hover:bg-[#A3DAFF]"
        >
          <div v-if="loading" class="px-2">
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <span v-else>Filter</span>
        </button>
      </div>
    </div>
  </div>
</template>
