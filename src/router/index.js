import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearningModuleLayout from '../views/LearningModuleLayout.vue'
import ScamDetector from '@/views/ScamDetector.vue'
import SimulationGames from '@/views/SimulationGames.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/learning-module/:moduleName?',
      name: 'learningmodule',
      component: LearningModuleLayout,
      props: true,
    },
    {
      path: '/scam-detector',
      name: 'scamdetector',
      component: ScamDetector,
    },
    {
      path: '/simulation-games',
      name: 'simulationgames',
      component: SimulationGames,
    },
  ],
})

export default router
