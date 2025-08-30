import { createRouter, createWebHistory } from 'vue-router'
import Password from '@/views/Password.vue'
import HomeView from '../views/HomeView.vue'
import LearningModuleLayout from '../views/LearningModuleLayout.vue'
import ScamDetector from '@/views/ScamDetector.vue'
import SimulationGames from '@/views/SimulationGames.vue'
import TrueOrFalse from '@/views/game/TrueOrFalse.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'password',
      component: Password,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/learning-module/:moduleName?',
      name: 'learningmodule',
      component: LearningModuleLayout,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/scam-detector',
      name: 'scamdetector',
      component: ScamDetector,
      meta: { requiresAuth: true }
    },
    {
      path: '/simulation-games',
      name: 'simulationgames',
      component: SimulationGames,
      meta: { requiresAuth: true }
    },
    {
      path: '/simulation-games/true-or-false',
      name: 'trueorfalse',
      component: TrueOrFalse,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound,
      meta: { requiresAuth: true }
    }
  ],
})

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('scamspot_auth') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
