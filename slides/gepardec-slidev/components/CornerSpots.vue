<script setup lang="ts">
import spotsUrl from '../assets/spots.png'
defineProps<{ opacity?: number }>()
</script>

<template>
  <img
    class="gepardec-corner-spots"
    :style="{ opacity: opacity ?? 1 }"
    :src="spotsUrl"
    alt=""
    aria-hidden="true"
  />
</template>
