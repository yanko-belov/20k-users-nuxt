<template>
  <div class="header">
    <div>Picture</div>
    <div>Name</div>
    <div>Country</div>
    <div>Age</div>
    <div>Company</div>
  </div>
  <RecycleScroller
    class="scroller"
    :emit-update="true"
    :items="users"
    :item-size="60"
    key-field="_id"
    v-slot="{ item: user }"
    @update="onUpdate"
  >
    <User :user="user" />
  </RecycleScroller>
</template>

<script lang="ts" setup>
// @ts-ignore
import { defineProps, defineEmits } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import User from "~/components/user.vue";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import type { IUser } from "~/types";

const props = defineProps<{ users: IUser[]; isLoading: boolean }>();
const emit = defineEmits<{ (e: "loadMore"): void }>();

const onUpdate = (
  startIndex: number,
  endIndex: number,
  visibleStartIndex: number,
  visibleEndIndex: number
) => {
  if (!props.isLoading && visibleEndIndex > props.users.length - 300) {
    emit("loadMore");
  }
};
</script>

<style scoped>
.header {
  height: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.header > div {
  width: 20%;
}
.scroller {
  height: 600px;
}
</style>
