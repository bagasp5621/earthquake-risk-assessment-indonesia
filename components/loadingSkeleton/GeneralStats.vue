<template>
  <div class="p-4 bg-[#1D1F25] rounded-xl mb-5">
    <div
      class="bg-[#31343b] p-3 mr-[80rem] rounded-xl animate-pulse mb-6"
    ></div>
    <div class="grid grid-cols-4 justify-items-stretch gap-16">
      <div
        v-for="number in 4"
        :key="number"
        class="bg-[#31343b] py-20 rounded-xl animate-pulse"
      ></div>
    </div>
  </div>

  <div class="p-4 bg-[#1D1F25] rounded-xl">
    <div class="flex ml-4 py-2">
      <div class="py-[17rem] px-2 bg-[#31343b] rounded-xl animate-pulse"></div>
      <div v-for="number in 17" :key="number" class="flex flex-col justify-end">
        <div
          :style="{ paddingTop: `${number}rem`, paddingBottom: `${number}rem` }"
          class="px-2 bg-[#31343b] mx-9 rounded-xl animate-pulse"
        ></div>
      </div>
    </div>
    <div
      class="py-2 px-100 mx-5 mt-5 bg-[#31343b] animate-pulse rounded-xl"
    ></div>
  </div>
</template>

<!-- :style="{ paddingTop: `${number}rem`, paddingBottom: `${number}rem` }" -->
