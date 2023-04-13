<template>
  <div class="flex items-center space-x-4">
    <div class="flex-shrink-0">
      <img class="h-11 w-11 rounded-full" :src="user.picture" :alt="fullName" />
    </div>
    <div class="info">
      <p class="main">
        {{ fullName }}
      </p>
      <p class="secondary">{{ user.age }} years old</p>
    </div>
    <div class="info">
      <p class="main">
        {{ user.email }}
      </p>
      <p class="secondary italic underline decoration-dashed">
        {{ user.phone }}
      </p>
    </div>
    <div class="info">
      <p class="main">
        {{ user.country }}
      </p>
      <p class="secondary">
        {{ user.address }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IUser } from "~/types";

const props = defineProps<{ user: IUser }>();
const fullName = computed<string>(
  () => `${props.user.name.first} ${props.user.name.last}`
);
</script>

<style lang="scss" scoped>
.info {
  @apply min-w-0 flex-1;

  .main {
    @apply mb-1 truncate text-sm font-medium text-gray-900;
  }
  .secondary {
    @apply truncate text-sm text-gray-500;
  }
}
</style>
