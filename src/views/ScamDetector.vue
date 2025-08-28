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

        <input
          class="placeholder:text-center mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Please insert text or picture in this bracket"
        />

        <div class="mt-10">
          <div class="bg-blue-900 text-white p-2.5 rounded-3xl">
            Scam detection model is a AI powered tool designed to detect scam messages. By using
            this tool, it is expected users will decrease the probability to get scammed
          </div>
        </div>

        <!-- QR CODE -->
        <div class="mt-10">
          <!-- TODO -->
        </div>
      </main>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .scam-detector {
    min-height: 100vh;
    display: flex;
  }
}
</style>
<script setup lang="ts"></script>
