<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
import CornerSpots from '../components/CornerSpots.vue'
import defaultCheetah from '../assets/cheetah_cropped.jpg'

defineProps<{
  /**
   * Optional override for the section image.
   * Defaults to the cheetah asset bundled with the theme.
   */
  image?: string
}>()
</script>

<template>
  <div class="gepardec-section slidev-layout">
    <div
      class="section-image"
      :style="{ backgroundImage: `url(${image ?? defaultCheetah})` }"
    />

    <div class="section-content">
      <slot />
    </div>

    <CornerSpots />
    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-section {
  padding: 0;
  height: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 1fr;
  align-items: stretch;
}

.section-image {
  height: 100%;
  width: 100%;
  background-color: #000;
  background-size: cover;
  background-position: right center;
}

.section-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 4rem 3rem 1rem;
  z-index: 3;
}

.section-content :deep(h1) {
  font-size: 3.4rem;
  line-height: 1.05;
  color: var(--gepardec-yellow);
  margin: 0;
}

.section-content :deep(h2) {
  font-size: 1.3rem;
  color: var(--gepardec-white);
  margin-top: 0.6rem;
}

.section-content :deep(p) {
  color: var(--gepardec-white);
  font-size: 0.95rem;
}
</style>
