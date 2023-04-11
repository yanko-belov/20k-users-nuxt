<template>
  <div class="user">
    <div>
      <img :src="user.picture" :alt="fullName" />
    </div>
    <div>{{ fullName }}</div>
    <div>{{ user.country }}</div>
    <div>{{ user.age }}</div>
    <div>{{ user.company }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { IUser } from "~/types";

const props = defineProps<{user: IUser}>();
const fullName = computed(
  () => `${props.user.name.first} ${props.user.name.last}`
);
</script>

<style scoped>
.user {
  height: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
}
.user > div {
  width: 20%;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}
</style>
