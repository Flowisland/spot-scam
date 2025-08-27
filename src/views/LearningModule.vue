<script setup>
import { ref } from 'vue'

const collapsed = ref(false)

// function toggleSidebar() {
//   collapsed.value = !collapsed.value
// }

const modules = [
  'Introduction To Scams',
  'Why People Fall Prey',
  'Understanding Scam Types',
  'Government Scams',
  'Investment Scams',
  'Job Scams',
  'E-commerce Scams',
  'Fake Friend Call',
  'Phishing Scams',
]
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside
      :class="[collapsed ? 'w-16' : 'w-64']"
      class="bg-blue-900 text-white transition-all duration-300 flex flex-col"
    >
      <!-- Toggle arrow -->
      <!-- <button class="p-2 bg-blue-800 rounded-none focus:outline-none" @click="toggleSidebar">
        <span v-if="collapsed">></span>
        <span v-else><</span>
      </button> -->

      <!-- Sidebar items -->
      <ul v-if="!collapsed" class="flex-1 mt-0 p-0">
        <li
          v-for="item in modules"
          :key="item"
          class="p-2 hover:bg-blue-800 cursor-pointer list-none"
        >
          {{ item }}
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-0">
      <h1>Main Content Area</h1>
      <p>Add your module content here.</p>
    </main>
  </div>
</template>

<style>
/* Make sidebar full height */
aside {
  min-height: 100vh;
}
</style>
