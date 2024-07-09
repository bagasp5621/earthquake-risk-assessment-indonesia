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
  <div class="py-1">
    <nuxt-link
      :to="item?.route"
      class="flex p-4 hover:bg-[#3c4246]"
      :class="{ 'bg-[#3c4246]': isActiveRoute(item?.route) }"
    >
      <Icon :isOpen="isActiveRoute(item?.route)" :route="item?.route" />
      <p
        class="flex flex-col justify-center pl-5 font-semibold"
        :class="{ 'text-[#8ED1FE]': isActiveRoute(item?.route) }"
      >
        {{ item?.title }}
      </p>
    </nuxt-link>
  </div>
</template>
