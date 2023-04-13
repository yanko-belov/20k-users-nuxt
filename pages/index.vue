<template>
  <NavBar />
  <div class="mx-auto max-w-screen-xl p-6">
    <div class="rounded-lg bg-white px-8 pb-8">
      <div class="sticky top-[80px] z-50 bg-white pb-4 pt-8">
        <FilterInput v-model="filter" :is-loading="isLoading" />
      </div>
      <template v-if="users.length">
        <UsersList
          :users="users"
          :is-loading="isLoading"
          @load-more="loadMore"
        />
        <EndOfList v-if="!hasMore" />
      </template>
      <NoData
        v-else-if="hasActiveFilter && !isLoading"
        @clear-filter="clearFilter"
      >
        No users with country "<span class="text-blue-700">{{ filter }}</span
        >"
      </NoData>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import type { IUser } from "~/types";

useHead({
  bodyAttrs: {
    class: "bg-gray-200",
  },
});

const users = ref<IUser[]>([]);
const offset = ref(0);
const filter = ref("");
const isLoading = ref(true);
const totalCount = ref(-1);

const hasMore = computed(() => totalCount.value > users.value.length);
const hasActiveFilter = computed(() => !!filter.value);

const clearFilter = () => (filter.value = "");

const fetchUsers = async (clearOldData = false) => {
  isLoading.value = true;
  try {
    const response = await $fetch<{ users: IUser[]; totalCount: number }>(
      `/api/list?offset=${offset.value}&filter=${filter.value}`
    );
    if (clearOldData) {
      users.value = response.users;
    } else {
      users.value.push(...response.users);
    }
    totalCount.value = response.totalCount;
  } catch (e) {
    users.value = [];
    totalCount.value = -1;
  } finally {
    isLoading.value = false;
  }
};

const loadMore = async () => {
  if (!hasMore.value) {
    return;
  }
  offset.value += 1000;
  await fetchUsers();
};

watch(
  filter,
  debounce(() => {
    offset.value = 0;
    fetchUsers(true);
  }, 500)
);

fetchUsers();
</script>
