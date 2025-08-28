<script setup>
import Button from '@/components/UI/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLearning() {
  router.push('/learning-module')
}
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <img
      src="@/assets/picture/homepage.png"
      alt="Hero"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Desktop/Tablet Layout (left side text) -->
    <div
      class="hidden md:flex relative z-10 flex-col justify-center h-full text-left"
      style="width: 50%; padding-left: 5%; min-width: 300px"
    >
      <h1
        class="text-black font-bold leading-tight"
        style="font-family: 'League Spartan'; font-size: clamp(30px, 5vw, 50px)"
      >
        STAY SAFE ONLINE:
      </h1>

      <h2
        class="text-black font-bold mt-2 leading-tight"
        style="font-family: 'League Spartan'; font-size: clamp(30px, 5vw, 50px)"
      >
        Learn To Spot Scam
      </h2>

      <p class="text-black mt-4 text-base md:text-lg lg:text-xl" style="max-width: 400px">
        Simple and interactive way to learn and identify scam designed just for you.
      </p>

      <Button text="LEARN MORE" class="mt-6" :onClick="goToLearning" />
    </div>

    <!-- Mobile Layout (bottom overlay with lighter gradient) -->
    <div
      class="md:hidden absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 text-center"
    >
      <h1
        class="text-white font-bold leading-tight mb-2"
        style="font-family: 'League Spartan'; font-size: clamp(24px, 6vw, 32px)"
      >
        STAY SAFE ONLINE:
      </h1>

      <h2
        class="text-white font-bold leading-tight mb-4"
        style="font-family: 'League Spartan'; font-size: clamp(24px, 6vw, 32px)"
      >
        Learn To Spot Scam
      </h2>

      <p class="text-white text-sm mb-6 leading-relaxed max-w-xs mx-auto">
        Simple and interactive way to learn and identify scam designed just for you.
      </p>

      <Button text="LEARN MORE" :onClick="goToLearning" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap');

body {
  margin: 0;
}
</style>
