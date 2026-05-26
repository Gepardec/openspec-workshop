<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
import CornerSpots from '../components/CornerSpots.vue'
import defaultCheetah from '../assets/cheetah.jpg'

defineProps<{
  /**
   * Optional override for the cover image.
   * Pass a path relative to your deck's public/ directory (e.g. "/my-cover.jpg").
   * Defaults to the cheetah asset bundled with the theme.
   */
  image?: string
}>()
</script>

<template>
  <div class="gepardec-cover slidev-layout">
    <div
      class="cover-image"
      :style="{ backgroundImage: `url(${image ?? defaultCheetah})` }"
    />

    <div class="cover-content">
      <slot />
    </div>

    <CornerSpots :opacity="0.55" />
    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-cover {
  padding: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
}

.cover-image {
  height: 100%;
  width: 100%;
  background-color: #000;
  background-size: cover;
  background-position: 35% center;
}

.cover-content {
  padding: 3rem 4rem 3rem 1rem;
  z-index: 2;
}

.cover-content :deep(h1) {
  font-size: 3.6rem;
  line-height: 1.05;
  color: var(--gepardec-yellow);
  font-weight: 500;
  margin: 0;
}

.cover-content :deep(h2) {
  font-size: 1.4rem;
  color: var(--gepardec-white);
  font-weight: 400;
  margin-top: 0.6rem;
}

.cover-content :deep(p) {
  color: var(--gepardec-white);
  font-size: 1rem;
  margin-top: 0.9rem;
}
</style>
