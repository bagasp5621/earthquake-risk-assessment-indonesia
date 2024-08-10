<script lang="ts">
import Icon from "./icon/icons.vue";

export default {
  props: {
    item: Object,
  },
  methods: {
    isActiveRoute(route: string | undefined) {
      return this.$route.path === route;
    },
  },
  components: { Icon },
};
</script>

<template>
  <div class="md:py-1">
    <nuxt-link
      :to="item?.route"
      class="md:flex md:p-4 hover:bg-[#3c4246]"
      :class="{ 'bg-[#3c4246]': isActiveRoute(item?.route) }"
    >
      <Icon :isOpen="isActiveRoute(item?.route)" :route="item?.route" />
      <div class="hidden md:block">
        <p
          class="md:flex md:flex-col md:justify-center md:pl-5 font-semibold"
          :class="{ 'text-[#8ED1FE]': isActiveRoute(item?.route) }"
        >
          {{ item?.title }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
