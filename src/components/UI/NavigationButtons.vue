<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  sequence: Array,
})

const route = useRoute()
const router = useRouter()

const currentIndex = computed(() => props.sequence.indexOf(route.path))

function goNext() {
  if (currentIndex.value < props.sequence.length - 1) {
    router.push(props.sequence[currentIndex.value + 1])
  }
}

function goPrev() {
  if (currentIndex.value > 0) {
    router.push(props.sequence[currentIndex.value - 1])
  }
}
</script>

<template>
  <div class="flex justify-between mt-6">
    <button
      class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      @click="goPrev"
      :disabled="currentIndex === 0"
    >
      ← Previous
    </button>

    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="goNext"
      :disabled="currentIndex === sequence.length - 1"
    >
      Next →
    </button>
  </div>
</template>
