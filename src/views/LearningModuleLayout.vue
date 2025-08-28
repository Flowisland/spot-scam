<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LearningModule from '@/components/LearningModule.vue'

const router = useRouter()
const route = useRoute()

import Button from '@/components/UI/Button.vue'

function startLearning() {
  router.push('/learning-module/introduction-to-scams')
}

// Track fold/unfold of "Understanding Scam Types"
const openScamTypes = ref(false)

// Track mobile & window dropdown open/close
const mobileMenuOpen = ref(false)
const windowWidth = ref(window.innerWidth)

function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Top-level modules with routes
const modules = [
  { name: 'Introduction To Scams', route: 'introduction-to-scams' },
  { name: 'Why People Fall Prey', route: 'why-people-fall-prey' },
  { name: 'Understanding Scam Types', route: null, hasSubmodules: true },
]

// Sub-items for "Understanding Scam Types"
const scamTypeSubs = [
  { name: 'Phishing Scams', route: 'phishing-scams' },
  { name: 'Impersonation Scams', route: 'impersonation-scams' },
  { name: 'Romance Scams', route: 'romance-scams' },
  { name: 'Investment Scams', route: 'investment-scams' },
  { name: 'Job Scams', route: 'job-scams' },
  { name: 'E-commerce Scams', route: 'ecommerce-scams' },
]

function toggleScamTypes() {
  openScamTypes.value = !openScamTypes.value
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Navigation functions
function navigateToModule(route) {
  if (route) {
    router.push(`/learning-module/${route}`)
  }
}

function navigateToSubModule(route) {
  router.push(`/learning-module/${route}`)
  // Close mobile menu after navigation
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="flex">
    <!-- Desktop Sidebar -->
    <aside
      v-if="windowWidth >= 1024"
      class="w-64 bg-blue-900 text-white flex-col fixed top-[72px] left-0 h-[calc(100vh-72px)] overflow-y-auto"
    >
      <ul class="p-0">
        <li v-for="item in modules" :key="item.name" class="list-none">
          <!-- Foldable item -->
          <template v-if="item.hasSubmodules">
            <div
              class="flex items-center justify-between p-3 hover:bg-blue-800 cursor-pointer"
              @click="toggleScamTypes"
            >
              <span>{{ item.name }}</span>
              <span>{{ openScamTypes ? '▲' : '▼' }}</span>
            </div>

            <!-- Sub-items only when unfolded -->
            <ul v-if="openScamTypes" class="pl-4">
              <li
                v-for="sub in scamTypeSubs"
                :key="sub.name"
                class="p-2 hover:bg-blue-700 cursor-pointer list-none text-base"
                @click="navigateToSubModule(sub.route)"
              >
                {{ sub.name }}
              </li>
            </ul>
          </template>

          <!-- Normal items -->
          <template v-else>
            <div class="p-3 hover:bg-blue-800 cursor-pointer" @click="navigateToModule(item.route)">
              {{ item.name }}
            </div>
          </template>
        </li>
      </ul>
    </aside>

    <!-- Mobile Dropdown Menu -->
    <div v-else class="w-full bg-blue-900 text-white fixed top-[72px] left-0 z-50">
      <button
        @click="toggleMobileMenu"
        class="w-full flex justify-between items-center px-4 py-3 bg-blue-800 focus:outline-none"
      >
        <span>Learning Modules</span>
        <span>{{ mobileMenuOpen ? '▲' : '▼' }}</span>
      </button>

      <ul v-if="mobileMenuOpen" class="p-0">
        <li v-for="item in modules" :key="item.name" class="list-none">
          <!-- Foldable item -->
          <template v-if="item.hasSubmodules">
            <div
              class="flex items-center justify-between px-4 py-2 hover:bg-blue-700 cursor-pointer"
              @click="toggleScamTypes"
            >
              <span>{{ item.name }}</span>
              <span>{{ openScamTypes ? '▲' : '▼' }}</span>
            </div>

            <!-- Sub-items only when unfolded -->
            <ul v-if="openScamTypes" class="pl-6">
              <li
                v-for="sub in scamTypeSubs"
                :key="sub.name"
                class="px-4 py-2 hover:bg-blue-600 cursor-pointer list-none text-base"
                @click="navigateToSubModule(sub.route)"
              >
                {{ sub.name }}
              </li>
            </ul>
          </template>

          <!-- Normal items -->
          <template v-else>
            <div
              class="px-4 py-2 hover:bg-blue-700 cursor-pointer"
              @click="navigateToModule(item.route)"
            >
              {{ item.name }}
            </div>
          </template>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <!-- <main
      class="flex-1 flex flex-col items-center justify-center p-6"
      :class="windowWidth >= 1024 ? 'lg:ml-64' : ''"
    >
      <img
        src="@/assets/module.png"
        alt="Get to Know Scam"
        class="w-98 h-98 mb-6 mt-12 object-contain"
      />

      <h1 class="text-3xl font-bold text-black mb-4 text-center">GET TO KNOW SCAM</h1>
      <Button :text="'GET STARTED'" :onClick="startLearning" />
    </main> -->

    <main class="flex-1 p-6" :class="windowWidth >= 1024 ? 'lg:ml-64 pt-6' : 'pt-[120px]'">
      <LearningModule v-if="route.params.moduleName" :moduleName="route.params.moduleName" />
      <div v-else class="text-center py-12">
        <img
          src="@/assets/picture/module.png"
          alt="Get to Know Scam"
          class="w-98 h-98 mb-6 mt-12 object-contain"
        />
        <!-- <h1 class="text-3xl font-bold text-gray-900 mb-4">Learning Modules</h1>
        <p class="text-lg text-gray-600 mb-8">
          Select a module from the sidebar to begin learning about scam detection and prevention.
        </p> -->
        <h1 class="text-3xl font-bold text-black mb-4 text-center">GET TO KNOW SCAM</h1>
        <Button :text="'GET STARTED'" :onClick="startLearning" />
      </div>
    </main>
  </div>
</template>
