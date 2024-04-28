<template>
  <div class="p-4 bg-[#1D1F25] rounded-xl">
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
</template>
