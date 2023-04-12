<template>
  <button @click="signOut">Sign Out</button>

  <input v-model.trim="filter" type="text" placeholder="Filter by country" />
  <template v-if="users.length">
    <UsersList :users="users" :is-loading="isLoading" @load-more="loadMore" />
    <div class="status">{{ users.length }} / {{ totalCount }}</div>
  </template>
  <div v-else-if="filter && isLoading" class="status">Searching...</div>
  <div v-else-if="filter && !isLoading" class="status">
    No users with country '{{ filter }}'
  </div>
  <div v-else-if="!filter && isLoading" class="status">Loading...</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import type { IUser } from "~/types";

definePageMeta({ middleware: "auth" });

const { signOut } = useAuth();
const users = ref<IUser[]>([]);
const offset = ref(0);
const filter = ref("");
const isLoading = ref(true);
const totalCount = ref(-1);

const hasMoreValues = computed(() => totalCount.value > users.value.length);

const loadMore = async () => {
  if (!hasMoreValues.value) {
    return;
  }
  offset.value += 1000;
  await fetchUsers();
};

async function fetchUsers(clearOldData = false) {
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
}

watch(
  filter,
  debounce(() => {
    users.value = [];
    offset.value = 0;
    fetchUsers(true);
  }, 500)
);

fetchUsers();
</script>

<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.status {
  padding: 12px 20px;
  text-align: center;
  font-size: 1.2rem;
}
</style>
