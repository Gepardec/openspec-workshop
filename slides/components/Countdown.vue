<template>
  <div class="flex items-center gap-6">
    <div
      class="font-mono text-5xl font-bold tabular-nums"
      :class="done ? 'text-green-400' : running ? 'text-yellow-300' : 'text-white'"
    >
      {{ minutes }}:{{ seconds }}
    </div>
    <button v-if="!running && !done" class="timer-btn" @click="start">▶ Start</button>
    <button v-if="done || running" class="timer-btn timer-btn-reset" @click="reset">↺ Reset</button>
    <span v-if="done" class="text-green-400 font-semibold text-lg">Zeit abgelaufen!</span>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  minutes: { type: Number, default: 5 },
})

const total = props.minutes * 60
const timeLeft = ref(total)
const running = ref(false)
const done = ref(false)
let interval = null

const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))

function start() {
  if (running.value) return
  running.value = true
  interval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(interval)
      timeLeft.value = 0
      done.value = true
    }
  }, 1000)
}

function reset() {
  clearInterval(interval)
  interval = null
  timeLeft.value = total
  running.value = false
  done.value = false
}

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.timer-btn {
  padding: 0.45rem 1.2rem;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
}
.timer-btn:hover { background: rgba(255,255,255,0.2); }
.timer-btn-reset { background: rgba(255,255,255,0.06); }
</style>
