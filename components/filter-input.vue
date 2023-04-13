<template>
  <div class="relative inline-block">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <img
        src="/img/icons/search.svg"
        alt="Search"
        class="h-5 w-5 text-gray-500"
      />
    </div>
    <input
      type="text"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:w-80"
      placeholder="Filter users by country"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
    >
      <LoadingSpinner v-if="isLoading" class="inline h-4 w-4 text-blue-600" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";

withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    isLoading?: boolean;
  }>(),
  {
    modelValue: "",
    disabled: false,
    isLoading: false,
  }
);
defineEmits<{ (e: "update:modelValue", value: string): void }>();
</script>
