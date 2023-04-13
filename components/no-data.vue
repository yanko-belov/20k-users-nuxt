<template>
  <div class="flex h-full flex-col items-center justify-center">
    <img src="/img/no-data.svg" alt="No currencies found" class="w-96" />
    <h1 class="mt-5 text-2xl font-bold">
      <slot />
    </h1>

    <button
      type="button"
      class="mt-3 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      @click="clearFilter"
    >
      Clear filter
    </button>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{ (e: "clear-filter"): void }>();

const clearFilter = () => emits("clear-filter");
</script>
