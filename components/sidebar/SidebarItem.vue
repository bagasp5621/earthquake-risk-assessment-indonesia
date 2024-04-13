<script lang="ts">
export default {
  props: {
    item: Object,
  },
  methods: {
    isActiveRoute(route: string | undefined) {
      return this.$route.path === route;
    },
  },
};
</script>

<template>
  <nuxt-link
    :to="item?.route"
    class="flex p-4 hover:bg-[#51504D]"
    :class="{ 'bg-[#51504D]': isActiveRoute(item?.route) }"
  >
    <img
      :src="isActiveRoute(item?.route) ? item?.image : item?.inactiveImage"
      alt="maps"
      class="w-10"
    />
    <p
      class="flex flex-col justify-center pl-5 font-semibold"
      :class="{ 'text-[#FFD369]': isActiveRoute(item?.route) }"
    >
      {{ item?.title }}
    </p>
  </nuxt-link>
</template>
