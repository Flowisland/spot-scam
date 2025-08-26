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
      src="@/assets/homepage.png"
      alt="Hero"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div
      class="relative z-10 flex flex-col justify-center h-full text-left"
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
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap');

body {
  margin: 0;
}
</style>
