<template>
  <div class="flex items-center gap-6">
    <div
      class="font-mono text-5xl font-bold tabular-nums"
      :class="status === 'done' ? 'text-green-400' : status === 'running' ? 'text-yellow-300' : 'text-white'"
    >
      {{ display.m }}:{{ display.s }}
    </div>
    <button v-if="status === 'stopped'" class="timer-btn" @click="start">▶ Start</button>
    <button v-if="status !== 'stopped'" class="timer-btn timer-btn-reset" @click="reset">↺ Reset</button>
    <span v-if="status === 'done'" class="text-green-400 font-semibold text-lg">Zeit abgelaufen!</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  minutes: { type: Number, default: 5 },
})

const STORAGE_KEY = 'workshop-countdown'
const limitMs = props.minutes * 60 * 1000

const status = ref('stopped') // stopped | running | done
const startedAt = ref(0)

const now = ref(Date.now())
let timerId = null
const channel = new BroadcastChannel('workshop-countdown')

const passedMs = computed(() => {
  if (status.value === 'running') return Math.min(Math.max(0, now.value - startedAt.value), limitMs)
  if (status.value === 'done') return limitMs
  return 0
})
const timeLeftSec = computed(() => Math.ceil((limitMs - passedMs.value) / 1000))
const display = computed(() => ({
  m: String(Math.floor(timeLeftSec.value / 60)).padStart(2, '0'),
  s: String(timeLeftSec.value % 60).padStart(2, '0'),
}))

function applyState(s) {
  status.value = s.status
  startedAt.value = s.startedAt
}

function broadcast() {
  const s = { status: status.value, startedAt: startedAt.value }
  channel.postMessage(s)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

channel.onmessage = ({ data }) => applyState(data)

function start() {
  startedAt.value = Date.now()
  status.value = 'running'
  broadcast()
}

function reset() {
  status.value = 'stopped'
  startedAt.value = 0
  broadcast()
}

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved) applyState(saved)
  }
  catch {}
  timerId = setInterval(() => {
    now.value = Date.now()
    if (status.value === 'running' && now.value - startedAt.value >= limitMs) {
      status.value = 'done'
      broadcast()
    }
  }, 500)
})

onUnmounted(() => {
  clearInterval(timerId)
  channel.close()
})
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
