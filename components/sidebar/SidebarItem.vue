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
  <div class="py-1">
    <nuxt-link
      :to="item?.route"
      class="flex p-4 hover:bg-[#3c4246]"
      :class="{ 'bg-[#3c4246]': isActiveRoute(item?.route) }"
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
  </div>
</template>
