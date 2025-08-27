<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  moduleName: {
    type: String,
    required: true,
  },
})

const router = useRouter()

// Current page tracking
const currentPage = ref(1)
const moduleData = ref(null)
const loading = ref(true)
const error = ref(null)

// Dynamic import function
async function loadModule(moduleName) {
  try {
    loading.value = true
    error.value = null

    // Convert route param to filename format
    const fileName = moduleName.toLowerCase().replace(/-/g, '-')
    const module = await import(`@/data/modules/${fileName}.js`)
    moduleData.value = module.default

    // Reset to first page when loading new module
    currentPage.value = 1
  } catch (err) {
    console.error('Failed to load module:', err)
    error.value = `Module "${moduleName}" not found`
    moduleData.value = null
  } finally {
    loading.value = false
  }
}

// Load module when component mounts
onMounted(() => {
  if (props.moduleName) {
    loadModule(props.moduleName)
  }
})

// Watch for module name changes
watch(
  () => props.moduleName,
  (newModuleName) => {
    if (newModuleName) {
      loadModule(newModuleName)
    }
  },
  { immediate: true },
)

// Computed properties
const currentPageData = computed(() => {
  if (!moduleData.value) return null
  return moduleData.value.pages.find((page) => page.id === currentPage.value)
})

const isLastPage = computed(() => currentPage.value === moduleData.value?.totalPages)

const isFirstPage = computed(() => currentPage.value === 1)

const progressPercentage = computed(() => {
  if (!moduleData.value) return 0
  return (currentPage.value / moduleData.value.totalPages) * 100
})

// Navigation functions
function nextPage() {
  if (!isLastPage.value) {
    currentPage.value++
  } else {
    // Module completed
    completeModule()
  }
}

function previousPage() {
  if (!isFirstPage.value) {
    currentPage.value--
  }
}

function completeModule() {
  // You can add completion logic here (save progress, etc.)
  alert(
    `🎉 Module "${moduleData.value?.title}" completed! Great job learning about scam prevention.`,
  )

  // Option 1: Go back to module selection
  router.push('/learning-module')

  // Option 2: Navigate to next logical module
  // navigateToNextModule()
}

function navigateToNextModule() {
  // Define the logical progression of modules
  const moduleOrder = [
    'introduction-to-scams',
    'why-people-fall-prey',
    'government-scams',
    'investment-scams',
    'job-scams',
    'ecommerce-scams',
    'fake-friend-call',
    'phishing-scams',
  ]

  const currentIndex = moduleOrder.indexOf(props.moduleName)
  const nextIndex = currentIndex + 1

  if (nextIndex < moduleOrder.length) {
    router.push(`/learning-module/${moduleOrder[nextIndex]}`)
  } else {
    // All modules completed
    router.push('/learning-module')
  }
}

function goBack() {
  router.push('/learning-module')
}
</script>

<template>
  <div class="min-h-[calc(100vh-200px)]">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-64">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <div class="text-lg text-gray-600">Loading module...</div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center h-64">
      <div class="text-center bg-red-50 p-8 rounded-lg max-w-md">
        <div class="text-red-600 text-5xl mb-4">⚠️</div>
        <div class="text-lg text-red-700 mb-4">{{ error }}</div>
        <p class="text-sm text-red-600 mb-6">
          This module might not be created yet or there's an issue loading it.
        </p>
        <button
          @click="goBack"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Modules
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-4xl mx-auto">
      <!-- Header with progress -->
      <div class="bg-white shadow-sm border rounded-lg mb-6">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between mb-4">
            <button
              @click="goBack"
              class="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
            >
              <span class="mr-2">←</span>
              Back to Modules
            </button>
            <div class="text-sm text-gray-500">
              Page {{ currentPage }} of {{ moduleData?.totalPages }}
            </div>
          </div>

          <!-- Progress bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>

          <h1 class="text-xl font-bold text-gray-900">
            {{ moduleData?.title }}
          </h1>
          <h2 class="text-lg text-gray-700 mt-1">
            {{ currentPageData?.title }}
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-sm border p-8 mb-6">
        <div v-html="currentPageData?.content" class="prose max-w-none"></div>
      </div>

      <!-- Navigation -->
      <div class="bg-white border rounded-lg">
        <div class="px-6 py-4">
          <div class="flex justify-between items-center">
            <button
              v-if="!isFirstPage"
              @click="previousPage"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <div v-else></div>

            <button
              @click="nextPage"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {{ isLastPage ? 'Complete Module' : 'Continue' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for content */
:deep(.prose h2) {
  @apply text-2xl font-bold mb-4 text-gray-900;
}
:deep(.prose h3) {
  @apply text-lg font-semibold mb-2 text-gray-800;
}
:deep(.prose p) {
  @apply mb-4 text-gray-700 leading-relaxed;
}
:deep(.prose ul) {
  @apply mb-4;
}
:deep(.prose li) {
  @apply text-gray-700;
}
:deep(.prose strong) {
  @apply font-semibold text-gray-900;
}
</style>
