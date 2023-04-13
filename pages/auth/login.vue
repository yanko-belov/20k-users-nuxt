<template>
  <section class="bg-gray-200">
    <div
      class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
    >
      <router-link
        to="/auth/login"
        class="mb-6 flex items-center text-2xl font-semibold text-gray-900"
      >
        <img class="mr-2 h-8 w-8" src="/img/logo.svg" alt="20k Users Filter" />
        20k Users
      </router-link>
      <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.stop.prevent="signIn">
            <div>
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                v-model.trim="username"
                :disabled="isLoggingIn"
                type="email"
                name="email"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                v-model.trim="password"
                :disabled="isLoggingIn"
                type="password"
                name="password"
                placeholder="••••••••"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                required=""
                @keydown.enter="signIn"
              />
            </div>
            <button
              :disabled="isLoggingIn"
              type="submit"
              class="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <LoadingSpinner
                v-if="isLoggingIn"
                class="mr-3 inline h-4 w-4 text-white"
              />
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
const { signIn: authSignIn } = useAuth();

const username = ref("michaelallen@ontagene.com");
const password = ref("some-password");
const isLoggingIn = ref(false);
const router = useRouter();

const signIn = async (): Promise<void> => {
  isLoggingIn.value = true;
  try {
    await authSignIn("credentials", {
      username: username.value,
      password: password.value,
      redirect: false,
    });
    isLoggingIn.value = false;
    await router.replace("/");
  } catch (error) {
    console.error(error);
  } finally {
    isLoggingIn.value = false;
  }
};
</script>
