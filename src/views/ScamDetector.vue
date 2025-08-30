<template>
  <div class="relative w-full h-screen overflow-hidden">
    <img
      src="@/assets/picture/scam_detector_bg.png"
      alt="Hero"
      class="absolute inset-0 w-full h-full object-cover opacity-25"
    />

    <!-- Desktop/Tablet view -->
    <div class="hidden md:flex relative mt-10 z-10 flex-col justify-center h-full items-center">
      <main class="flex-1 flex flex-col w-3/6">
        <h1 class="text-5xl font-bold text-black mb-4 text-center">SCAM DETECTION MODEL</h1>

        <textarea
          v-model="inputText"
          @input="clearResults"
          class="placeholder:text-center mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[100px]"
          placeholder="Please insert text to check for scam"
          :disabled="isAnalyzing"
        ></textarea>

        <button
          @click="analyzeText"
          :disabled="isAnalyzing || !inputText.trim()"
          class="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-3xl transition-colors"
        >
          {{ isAnalyzing ? 'Analyzing...' : 'Analyze for Scam' }}
        </button>

        <!-- Results Section -->
        <div v-if="result" class="mt-6">
          <div
            :class="[
              'text-white p-4 rounded-3xl text-center',
              result.isScam ? 'bg-red-600' : 'bg-green-600'
            ]"
          >
            <h3 class="font-bold text-lg mb-2">
              {{ result.isScam ? '⚠️ SCAM DETECTED' : '✅ APPEARS LEGITIMATE' }}
            </h3>
            <p class="mb-2">{{ result.message }}</p>
            <p class="text-sm">
              Confidence: {{ Math.round(result.confidence * 100) }}%
            </p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-3xl">
          {{ errorMessage }}
        </div>

        <div class="mt-10">
          <div class="bg-blue-900 text-white p-2.5 rounded-3xl">
            Scam detection model is a AI powered tool designed to detect scam messages. By using
            this tool, it is expected users will decrease the probability to get scammed
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputText = ref('')
const isAnalyzing = ref(false)
const result = ref<any>(null)
const errorMessage = ref('')

// API base URL
const API_BASE_URL = 'http://localhost:3000'

const clearResults = () => {
  result.value = null
  errorMessage.value = ''
}

const analyzeText = async () => {
  if (!inputText.value.trim() || isAnalyzing.value) return

  isAnalyzing.value = true
  errorMessage.value = ''
  result.value = null

  try {
    const response = await fetch(`${API_BASE_URL}/api/scam-detection/detect-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: inputText.value
      })
    })

    if (!response.ok) {
      throw new Error('Failed to analyze text')
    }

    const data = await response.json()
    result.value = data

  } catch (error) {
    console.error('Analysis error:', error)
    errorMessage.value = 'Failed to analyze text. Make sure the server is running.'
  } finally {
    isAnalyzing.value = false
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .scam-detector {
    min-height: 100vh;
    display: flex;
  }
}
</style>
