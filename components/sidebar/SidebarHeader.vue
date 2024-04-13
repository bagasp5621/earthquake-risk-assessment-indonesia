<script lang="ts">
export default {
  methods: {
    handleClick(message: string) {
      console.log(message);
    },
  },
};
</script>

<template>
  <div class="flex rounded-t-2xl bg-[#FFD369]">
    <img src="/logo.png" class="w-14 h-auto m-5" />
    <p class="flex items-center font-bold text-[#1C1C1C]">
      Eq. Risk Assessment
    </p>
    <div class="flex flex-col justify-end">
      <img
        src="/arrow.png"
        class="w-7 h-7 rotate-180 rounded-br-lg p-1.5 bg-[#373A45] cursor-pointer"
        @click="handleClick(`i click arrow`)"
      />
    </div>
  </div>
</template>
