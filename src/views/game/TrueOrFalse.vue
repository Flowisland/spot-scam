<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Game state
const currentQuestion = ref(0)
const userAnswers = ref([])
const showFeedback = ref(false)
const gameCompleted = ref(false)

// Questions data
const questions = ref([
  {
    question: "A person pretends to be your grandchild in distress and is asking for money urgently. This is a harmless misunderstanding.",
    answer: false,
    explanation: "This is a grandparent scam, a common 'impersonation' trick targeting elders."
  },
  {
    question: "If someone calls claiming to be from your bank and asks for your PIN to 'verify your identity', you should provide it immediately.",
    answer: false,
    explanation: "Banks never ask for PINs or passwords over the phone. This is a phishing attempt."
  },
  {
    question: "An email from a lottery you never entered says you've won millions and just need to pay a small processing fee. This could be legitimate.",
    answer: false,
    explanation: "This is a classic advance fee scam. Legitimate lotteries don't require upfront payments."
  },
  {
    question: "A tech support caller says your computer is infected and offers to fix it remotely for a fee. You should let them help.",
    answer: false,
    explanation: "This is a tech support scam. Legitimate tech companies don't make unsolicited calls about computer problems."
  },
  {
    question: "If a romantic interest you met online asks for money for an emergency, it's always genuine love.",
    answer: false,
    explanation: "This is a romance scam. Scammers build fake relationships to exploit emotions and steal money."
  },
  {
    question: "A caller claiming to be from the tax office threatens immediate arrest unless you pay now. This is urgent and real.",
    answer: false,
    explanation: "Government agencies don't threaten arrest over the phone or demand immediate payment. This is an impersonation scam."
  },
  {
    question: "An investment opportunity promising guaranteed high returns with no risk is too good to be true.",
    answer: true,
    explanation: "Correct! All investments carry risk. Promises of guaranteed high returns are typically Ponzi schemes or investment fraud."
  },
  {
    question: "If someone asks for your personal information to 'update their records', you should verify their identity first.",
    answer: true,
    explanation: "Correct! Always verify the caller's identity independently before sharing personal information."
  },
  {
    question: "Legitimate businesses will pressure you to make immediate decisions without time to think.",
    answer: false,
    explanation: "Pressure tactics are a red flag. Legitimate businesses allow time for consideration and don't use high-pressure sales tactics."
  },
  {
    question: "If an offer sounds too good to be true, it probably is.",
    answer: true,
    explanation: "Correct! This is a fundamental rule for avoiding scams. Trust your instincts when something seems unrealistic."
  }
])

// Computed properties
const currentQuestionData = computed(() => questions.value[currentQuestion.value])
const progress = computed(() => ((currentQuestion.value + 1) / questions.value.length) * 100)
const score = computed(() => {
  return userAnswers.value.filter((answer, index) =>
    answer.userAnswer === questions.value[index].answer
  ).length
})

const scorePercentage = computed(() => Math.round((score.value / questions.value.length) * 100))

// Methods
function submitAnswer(answer) {
  const questionData = currentQuestionData.value
  const isCorrect = answer === questionData.answer

  userAnswers.value[currentQuestion.value] = {
    userAnswer: answer,
    correctAnswer: questionData.answer,
    isCorrect: isCorrect,
    explanation: questionData.explanation
  }

  showFeedback.value = true
}

function nextQuestion() {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
    showFeedback.value = false
  } else {
    gameCompleted.value = true
  }
}

function restartGame() {
  currentQuestion.value = 0
  userAnswers.value = []
  showFeedback.value = false
  gameCompleted.value = false
}

function returnToGames() {
  router.push('/simulation-games')
}

function getProgressColor(questionIndex) {
  if (questionIndex <= currentQuestion.value && userAnswers.value[questionIndex]) {
    return userAnswers.value[questionIndex].isCorrect ? 'bg-green-500' : 'bg-yellow-300'
  } else if (questionIndex === currentQuestion.value) {
    return 'bg-blue-500'
  } else {
    return 'bg-gray-300'
  }
}
</script>

<template>
  <div class="relative w-full min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">

    <!-- Return to Games Button (Top Left) - Only show during game -->
    <div class="absolute top-4 left-4 sm:top-6 sm:left-6 z-10" v-if="!gameCompleted">
      <button
        @click="returnToGames"
        class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-base transition-colors duration-200 transform hover:scale-105"
        style="font-family: 'League Spartan'"
      >
        ← BACK TO GAMES
      </button>
    </div>

    <!-- Progress Bar -->
    <div class="max-w-4xl mx-auto mb-6 sm:mb-8 mt-16 sm:mt-20" v-if="!gameCompleted">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm sm:text-base font-medium text-gray-700" style="font-family: 'League Spartan'">
          Question {{ currentQuestion + 1 }} of {{ questions.length }}
        </span>
        <span class="text-sm sm:text-base font-medium text-gray-700" style="font-family: 'League Spartan'">
          {{ Math.round(progress) }}%
        </span>
      </div>

      <!-- Progress indicators -->
      <div class="flex gap-1 sm:gap-2 mb-4">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="flex-1 h-2 sm:h-3 rounded-full transition-colors duration-300"
          :class="getProgressColor(index)"
        ></div>
      </div>
    </div>

    <!-- Game Content -->
    <div class="max-w-4xl mx-auto">

      <!-- Question and Feedback Phase -->
      <div class="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10" v-if="!gameCompleted">
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 leading-tight"
          style="font-family: 'League Spartan'"
        >
          {{ currentQuestionData.question }}
        </h2>

        <!-- Show buttons if no feedback yet -->
        <div v-if="!showFeedback" class="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
          <button
            @click="submitAnswer(true)"
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 sm:px-12 rounded-lg text-lg sm:text-xl transition-colors duration-200 transform hover:scale-105"
            style="font-family: 'League Spartan'"
          >
            TRUE
          </button>

          <button
            @click="submitAnswer(false)"
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 sm:px-12 rounded-lg text-lg sm:text-xl transition-colors duration-200 transform hover:scale-105"
            style="font-family: 'League Spartan'"
          >
            FALSE
          </button>
        </div>

        <!-- Show feedback under the question -->
        <div v-if="showFeedback">
          <div class="text-center mb-6">
            <div
              v-if="userAnswers[currentQuestion].isCorrect"
              class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4"
            >
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div
              v-else
              class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full mb-4"
            >
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>

            <h3
              class="text-xl sm:text-2xl font-bold mb-2"
              :class="userAnswers[currentQuestion].isCorrect ? 'text-green-600' : 'text-yellow-600'"
              style="font-family: 'League Spartan'"
            >
              {{ userAnswers[currentQuestion].isCorrect ? 'Excellent!' : 'Good try! Let\'s learn together.' }}
            </h3>

            <p class="text-sm sm:text-base text-gray-600 mb-2" style="font-family: 'League Spartan'">
              Answer: {{ userAnswers[currentQuestion].correctAnswer ? 'TRUE' : 'FALSE' }}
            </p>
          </div>

          <div class="bg-blue-50 rounded-lg p-4 sm:p-6 mb-6">
            <h4 class="font-bold text-base sm:text-lg mb-2 text-blue-900" style="font-family: 'League Spartan'">
              Explanation:
            </h4>
            <p class="text-sm sm:text-base text-blue-800 leading-relaxed" style="font-family: 'League Spartan'">
              {{ userAnswers[currentQuestion].explanation }}
            </p>
          </div>

          <div class="text-center">
            <button
              @click="nextQuestion"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 transform hover:scale-105"
              style="font-family: 'League Spartan'"
            >
              {{ currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'SEE RESULTS' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results Phase -->
      <div v-if="gameCompleted" class="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 text-center">
        <div class="mb-6 sm:mb-8">
          <div
            class="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6"
            :class="scorePercentage >= 70 ? 'bg-green-100' : 'bg-yellow-100'"
          >
            <span
              class="text-2xl sm:text-3xl font-bold"
              :class="scorePercentage >= 70 ? 'text-green-600' : 'text-yellow-600'"
              style="font-family: 'League Spartan'"
            >
              {{ scorePercentage }}%
            </span>
          </div>

          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800"
            style="font-family: 'League Spartan'"
          >
            Quiz Complete!
          </h2>

          <p
            class="text-lg sm:text-xl text-gray-600 mb-2"
            style="font-family: 'League Spartan'"
          >
            You scored {{ score }} out of {{ questions.length }}
          </p>

          <p
            class="text-sm sm:text-base text-gray-500"
            style="font-family: 'League Spartan'"
          >
            {{ scorePercentage >= 70 ? 'Great job! You\'re well-prepared to spot scams.' : 'Keep learning! Practice makes perfect.' }}
          </p>
        </div>

        <!-- Score Breakdown -->
        <div class="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 class="font-bold text-base sm:text-lg mb-4 text-gray-800" style="font-family: 'League Spartan'">
            Your Answers:
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-3">
            <div
              v-for="(answer, index) in userAnswers"
              :key="index"
              class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white font-bold text-sm"
              :class="answer.isCorrect ? 'bg-green-500' : 'bg-gray-400'"
              style="font-family: 'League Spartan'"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="restartGame"
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 transform hover:scale-105"
            style="font-family: 'League Spartan'"
          >
            PLAY AGAIN
          </button>

          <button
            @click="returnToGames"
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 transform hover:scale-105"
            style="font-family: 'League Spartan'"
          >
            RETURN TO GAMES
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap');

body {
  margin: 0;
}
</style>
