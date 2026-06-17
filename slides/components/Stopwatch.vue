<template>
  <div class="flex flex-col items-center gap-6">
    <div
      class="font-mono tabular-nums font-bold"
      style="font-size: 5rem; line-height: 1;"
      :class="warning ? 'text-yellow-300' : 'text-white'"
    >
      {{ display.m }}:{{ display.s }}
    </div>
    <div class="flex gap-3">
      <button class="timer-btn" @click="toggle">{{ status === 'running' ? '⏸ Pause' : '▶ Start' }}</button>
      <button class="timer-btn timer-btn-reset" @click="reset">↺ Reset</button>
    </div>
    <div v-if="label" class="text-gray-400 text-sm">{{ label }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  warnAt: { type: Number, default: 13 },
  label: { type: String, default: '' },
})

const STORAGE_KEY = 'workshop-stopwatch'

const status = ref('stopped') // stopped | running | paused
const startedAt = ref(0)      // timestamp when current running segment began
const accumulatedMs = ref(0)  // ms elapsed before the current running segment

const now = ref(Date.now())
let timerId = null
const channel = new BroadcastChannel('workshop-stopwatch')

const totalMs = computed(() =>
  status.value === 'running'
    ? accumulatedMs.value + Math.max(0, now.value - startedAt.value)
    : accumulatedMs.value,
)
const totalSec = computed(() => Math.floor(totalMs.value / 1000))
const warning = computed(() => totalSec.value >= props.warnAt * 60)
const display = computed(() => ({
  m: String(Math.floor(totalSec.value / 60)).padStart(2, '0'),
  s: String(totalSec.value % 60).padStart(2, '0'),
}))

function applyState(s) {
  status.value = s.status
  startedAt.value = s.startedAt
  accumulatedMs.value = s.accumulatedMs
}

function broadcast() {
  const s = { status: status.value, startedAt: startedAt.value, accumulatedMs: accumulatedMs.value }
  channel.postMessage(s)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

channel.onmessage = ({ data }) => applyState(data)

function toggle() {
  if (status.value === 'running') {
    accumulatedMs.value += Date.now() - startedAt.value
    startedAt.value = 0
    status.value = 'paused'
  }
  else {
    startedAt.value = Date.now()
    status.value = 'running'
  }
  broadcast()
}

function reset() {
  status.value = 'stopped'
  startedAt.value = 0
  accumulatedMs.value = 0
  broadcast()
}

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved) applyState(saved)
  }
  catch {}
  timerId = setInterval(() => { now.value = Date.now() }, 500)
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
