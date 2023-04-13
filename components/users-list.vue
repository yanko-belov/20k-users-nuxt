<template>
  <div
    class="sticky top-[165px] z-50 mb-2 flex items-center space-x-4 rounded-sm bg-gray-100 py-4 text-xs font-semibold uppercase text-gray-700"
  >
    <div class="w-11 flex-shrink-0"></div>
    <div class="min-w-0 flex-1">User</div>
    <div class="min-w-0 flex-1">Contact</div>
    <div class="min-w-0 flex-1">Address</div>
  </div>
  <RecycleScroller
    v-slot="{ item: user }"
    :items="users"
    :item-size="itemSize"
    list-tag="ul"
    item-tag="li"
    key-field="_id"
    page-mode
  >
    <UserListItem :user="user" class="py-3" />
  </RecycleScroller>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RecycleScroller } from "vue-virtual-scroller";
import type { IUser } from "~/types";
import debounce from "lodash.debounce";

const props = defineProps<{ users: IUser[]; isLoading: boolean }>();
const emit = defineEmits<{ (e: "load-more"): void }>();

const itemSize = 68; // 68px is the height of the UserListItem component

const halfHeight = computed(() => props.users.length * (itemSize / 2));

const loadMoreIfTheScreenIsHalfScrolled = () => {
  if (window.scrollY > halfHeight.value) {
    emit("load-more");
  }
};

const loadMoreIfTheScreenIsHalfScrolledDebounced = debounce(
  loadMoreIfTheScreenIsHalfScrolled,
  100,
  { maxWait: 1000 }
);

onMounted(() => {
  window.addEventListener("scroll", loadMoreIfTheScreenIsHalfScrolledDebounced);
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "scroll",
    loadMoreIfTheScreenIsHalfScrolledDebounced
  );
});
</script>

<style lang="scss">
@import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

.vue-recycle-scroller__item-wrapper {
  @apply divide-y divide-gray-200;
}
</style>
