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
  <div class="md:flex md:rounded-t-2xl md:bg-[#8ED1FE]">
    <img src="/logo.png" class="w-10 h-auto md:w-14 m-5" />
    <p class="md:flex md:items-center md:font-bold md:text-[#1C1C1C]">
      Eq. Risk Assessment
    </p>
  </div>
</template>
