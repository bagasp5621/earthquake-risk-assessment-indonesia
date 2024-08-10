<script lang="ts">
export default {
  name: "Guide",
  data() {
    return {
      activeBar: "risk",
      sidebarItems: [
        { title: "Risk Map", action: "risk" },
        { title: "Hazard Map", action: "hazard" },
      ],
    };
  },
  methods: {
    changeSidebarAction(toActive: string) {
      this.activeBar = toActive;
    },
  },
};
</script>

<template>
  <div
    class="bg-[#1D1F25] h-[92.3vh] md:h-[96vh] md:rounded-xl md:grid md:grid-cols-6"
  >
    <!-- sub-sidebar -->
    <div class="hidden md:block md:col-span-1 m-4">
      <h1 class="font-bold text-xl mb-4">Getting Started</h1>
      <!-- content bar -->
      <div class="ml-2">
        <ul>
          <li
            v-for="item in sidebarItems"
            :key="item.action"
            :class="{
              'text-[#8ED1FE] bg-[#3c4246]': activeBar === item.action,
            }"
            class="cursor-pointer hover:text-[#8ED1FE] hover:bg-[#3c4246] p-2"
            @click="changeSidebarAction(item.action)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="md:col-span-5 m-2 h-full">
      <!-- Risk Content -->
      <div
        v-if="activeBar === 'risk'"
        class="flex flex-col justify-between h-full"
      >
        <div class="p-2">
          <div class="border-b-2 border-b-[#adadad] pb-10 mr-6 mb-6">
            <p class="text-2xl font-bold mb-6">Risk Map</p>
            <p>
              Risk Map is a feature used to get an overview of the earthquake
              hazard at a certain selected place. This feature allows you to
              select a point on the map. The selected point will issue
              earthquake hazard information in the form of a chart and hazard
              status based on the data owned.
            </p>
          </div>

          <div class="mr-6">
            <p class="text-xl font-bold mb-4">
              How to use risk map feature
            </p>
            <ul class="list-disc pl-5">
              <li class="my-3">Click Risk Map on the sidebar</li>
              <li class="my-3">
                When the map is visible, pin the desired place on the map
              </li>
              <li class="my-3">
                After the location is selected, a modal will appear that has loading in it. After loading is complete, information on the earthquake hazard at the selected location will come out. The results are in the form of earthquake risk, the number of earthquakes that have occurred in the area, and earthquake charts.
              </li class="my-3">
              <li>Click X button to close the modal </li>
            </ul>
          </div>
        </div>

        <div class="flex justify-end p-5 m-2 md:m-5">
          <p
            @click="changeSidebarAction('hazard')"
            class="border px-4 py-1 rounded-xl cursor-pointer select-none hover:bg-[#2c2c2c]"
          >
            Next
          </p>
        </div>
      </div>

      <!-- Hazard Content -->
      <div
        v-if="activeBar === 'hazard'"
        class="flex flex-col justify-between h-full overflow-y-auto"
      >
      <div class="p-2">
          <div class="border-b-2 border-b-[#adadad] pb-10 mr-6 mb-6">
            <p class="text-2xl font-bold mb-6">Hazard Map</p>
            <p class="mb-2">
              Hazard Map is a feature that can provide information about large earthquakes that have occurred before. This information is in the form of heatmap and there are details on each heatmap on the map. 
            </p>
            <p>This feature also includes a filter, which allows you to retrieve data according to the filter that you select. </p>
          </div>

          <div class="mr-6">
            <p class="text-xl font-bold mb-4">
              How to use hazard map feature
            </p>
            <ul class="list-disc pl-5">
              <li class="my-3">Click Hazard Map on the sidebar</li>
              <li class="my-3">
                When the set of heatmaps is visible on the map, select the desired heatmap. After loading is complete, a modal will appear that summarizes the selected heatmap. 
              </li>
              <li class="my-3">
                If you wants to retrieve the data in the table, you can download the table in csv form. To do it is very easy, just click the "Download as CSV" button then download popup will come out.
              </li class="my-3">
              <li>Click X button to close the modal </li>
            </ul>
          </div>

          <div class="mt-6 mr-6">
            <p class="text-xl font-bold mb-4">
              How to use filter feature
            </p>
            <ul class="list-disc pl-5">
              <li class="my-3">Click Hazard Map on the sidebar</li>
              <li class="my-3">
                On the top left of the map, there is a filter button. click it.
              </li>
              <li class="my-3">
                Input your desired earthquake filter. 
              </li class="my-3">
              <li class="my-3">
                The same modal will appear as in the heatmap feature, which provides information on earthquakes based on the filters input. There is also a table download feature.
              </li>
              <li>Click X button to close the modal </li>
            </ul>
          </div>
        </div>

        <div class="flex justify-between p-5 m-2 md:m-5">
          <p
            @click="changeSidebarAction('risk')"
            class="border px-2 py-1 rounded-xl cursor-pointer select-none hover:bg-[#2c2c2c]"
          >
            Previous
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
