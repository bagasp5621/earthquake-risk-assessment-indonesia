<template>
  <div class="grid grid-cols-6">
    <div class="col-span-1">
      <AppSidebar />
    </div>
    <div class="col-span-5 my-7 mr-7 rounded-2xl bg-[#1D1F25]">
      <slot />
    </div>
  </div>
</template>
