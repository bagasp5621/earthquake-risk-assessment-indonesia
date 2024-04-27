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
    class="flex p-4 hover:bg-[#31312f]"
    :class="{ 'bg-[#31312f]': isActiveRoute(item?.route) }"
  >
    <img
      :src="isActiveRoute(item?.route) ? item?.image : item?.inactiveImage"
      alt="maps"
      class="w-10"
    />
    <p
      class="flex flex-col justify-center pl-5 font-semibold"
      :class="{ 'text-[#8ED1FE]': isActiveRoute(item?.route) }"
    >
      {{ item?.title }}
    </p>
  </nuxt-link>
</template>
