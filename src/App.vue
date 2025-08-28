<script setup>
import { ref, watch, nextTick } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const menuOpen = ref(false)
const menuHeight = ref('0px') // for smooth slide

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

// Watch menuOpen to animate height
watch(menuOpen, async (open) => {
  await nextTick()
  const el = document.getElementById('mobile-menu')
  if (el) {
    menuHeight.value = open ? el.scrollHeight + 'px' : '0px'
  }
})

// Detect current route
const route = useRoute()
</script>

<template>
  <!-- Header -->
  <header class="bg-blue-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
    <div class="max-w-[1280px] mx-auto flex justify-between items-center p-4">
      <div class="flex items-center space-x-3">
        <img src="@/assets/picture/logo.png" alt="Logo" class="w-10 h-10 object-contain" />
        <h1 class="text-2xl font-bold" style="font-family: 'League Spartan'">SpotScam</h1>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden md:flex space-x-6">
        <RouterLink to="/" class="hover:text-gray-300 transition duration-300">Home</RouterLink>
        <RouterLink to="/learning-module" class="hover:text-gray-300 transition duration-300"
          >Learning Module</RouterLink
        >
        <RouterLink to="/scam-detector" class="hover:text-gray-300 transition duration-300"
          >Scam Detector</RouterLink
        >
        <RouterLink to="/simulation-games" class="hover:text-gray-300 transition duration-300"
          >Simulation Games</RouterLink
        >
      </nav>

      <!-- Mobile menu button -->
      <button class="md:hidden focus:outline-none" @click="toggleMenu">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile nav menu -->
    <nav
      id="mobile-menu"
      class="md:hidden bg-blue-800 overflow-hidden transition-all duration-300"
      :style="{ maxHeight: menuHeight }"
    >
      <div class="flex flex-col p-4 space-y-2">
        <RouterLink
          to="/"
          class="hover:text-gray-300 transition duration-300"
          @click="menuOpen = false"
          >Home</RouterLink
        >
        <RouterLink
          to="/learning-module"
          class="hover:text-gray-300 transition duration-300"
          @click="menuOpen = false"
          >Learning Module</RouterLink
        >
        <RouterLink
          to="/scam-detector"
          class="hover:text-gray-300 transition duration-300"
          @click="menuOpen = false"
          >Scam Detector</RouterLink
        >
        <RouterLink
          to="/simulation-games"
          class="hover:text-gray-300 transition duration-300"
          @click="menuOpen = false"
          >Simulation Games</RouterLink
        >
      </div>
    </nav>
  </header>

  <main class="mx-auto pt-[72px]">
    <RouterView />
  </main>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}
</style>
