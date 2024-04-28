<script lang="ts">
export default {
  name: "SummaryStat",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    pronounce: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="bg-[#8ED1FE] mt-2 p-5 rounded-2xl">
    <p class="text-lg text-black font-semibold">
      {{ title }}
    </p>
    <div class="mt-12">
      <div class="text-end text-black">
        <div class="border-l-2 border-black">
          <p>
            <span class="text-3xl font-black">
              {{ value }}
            </span>
            {{ " " }}
            <span class="text-lg font-semibold">
              {{ pronounce }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
