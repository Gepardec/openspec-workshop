<template>
  <div class="flex flex-col items-center gap-6">
    <div
      class="font-mono tabular-nums font-bold"
      style="font-size: 5rem; line-height: 1;"
      :class="warning ? 'text-yellow-300' : 'text-white'"
    >
      {{ minutes }}:{{ seconds }}
    </div>
    <div class="flex gap-3">
      <button class="timer-btn" @click="toggle">{{ running ? '⏸ Pause' : '▶ Start' }}</button>
      <button class="timer-btn timer-btn-reset" @click="reset">↺ Reset</button>
    </div>
    <div v-if="label" class="text-gray-400 text-sm">{{ label }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  warnAt: { type: Number, default: 13 },
  label: { type: String, default: '' },
})

const elapsed = ref(0)
const running = ref(false)
const warning = computed(() => elapsed.value >= props.warnAt * 60)
let interval = null

const minutes = computed(() => String(Math.floor(elapsed.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(elapsed.value % 60).padStart(2, '0'))

function toggle() {
  if (running.value) {
    clearInterval(interval)
    interval = null
    running.value = false
  } else {
    running.value = true
    interval = setInterval(() => { elapsed.value++ }, 1000)
  }
}

function reset() {
  clearInterval(interval)
  interval = null
  elapsed.value = 0
  running.value = false
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
