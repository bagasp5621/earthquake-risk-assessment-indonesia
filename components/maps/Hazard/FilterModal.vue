<script lang="ts">
export default {
  name: "FilterModal",
  data() {
    return {
      showFilterModal: false,
      north: 6,
      south: -11,
      east: 95,
      west: 141,
    };
  },
  methods: {
    filterAction() {
      console.log(this.north);
      console.log(this.south);
      console.log(this.east);
      console.log(this.west);
    },
  },
};
</script>

<template>
  <div :class="{ 'inset-0': showFilterModal }">
    <div @click="showFilterModal = true">
      <MapsHazardFilterIcon v-if="!showFilterModal" />
    </div>
    <div v-if="showFilterModal" class="bg-[#1D1F25] rounded-lg overflow-y-auto">
      <div class="flex m-2 justify-between">
        <div class="m-4">
          <p class="text-xl font-bold">Filter Earthquake</p>
        </div>
        <p
          @click="showFilterModal = false"
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
          class="rounded-lg bg-[#303D45] py-1 pl-2 mx-40"
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
            class="rounded-lg bg-[#303D45] py-1 pl-2 mr-10"
            required
          />
        </div>
        <div>
          <input
            type="number"
            v-model="east"
            placeholder="east"
            class="rounded-lg bg-[#303D45] py-1 pl-2"
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
          class="rounded-lg bg-[#303D45] py-1 pl-2 mx-40"
          required
        />
        <label for="south">South</label>
      </div>

      <!-- Date -->
      <div class="grid grid-cols-2 text-[#F7F7F7] mx-4 mt-5">
        <div class="flex flex-col">
          <label for="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2"
          />
        </div>
        <div class="flex flex-col">
          <label for="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2"
          />
        </div>
      </div>

      <!-- Magnitude -->
      <div class="grid grid-cols-2 text-[#F7F7F7] mx-4 mt-5">
        <div class="flex flex-col">
          <label for="minMag">Min Magnitude</label>
          <input
            type="number"
            id="minMag"
            placeholder="Min Magnitude"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2"
          />
        </div>
        <div class="flex flex-col">
          <label for="maxMag">Max Magnitude</label>
          <input
            type="number"
            id="maxMag"
            placeholder="Max Magnitude"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2"
          />
        </div>
      </div>

      <!-- Depth -->
      <div class="grid grid-cols-2 text-[#F7F7F7] mx-4 mt-5">
        <div class="flex flex-col">
          <label for="minDepth">Min Depth (Km)</label>
          <input
            type="number"
            id="maxDepth"
            placeholder="Max Depth"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2"
          />
        </div>
        <div class="flex flex-col">
          <label for="maxDepth">Max Depth (Km)</label
          ><input
            type="number"
            id="minDepth"
            placeholder="Min Depth"
            class="p-2 rounded-xl bg-[#303D45] mr-2 mt-2"
          />
        </div>
      </div>

      <!-- Filter Button -->
      <div class="flex justify-end mr-5 mt-5">
        <button
          @click="filterAction"
          class="py-1.5 px-5 rounded-2xl bg-[#8ED1FE] text-black font-bold hover:bg-[#A3DAFF]"
        >
          Filter
        </button>
      </div>
    </div>
  </div>
</template>
