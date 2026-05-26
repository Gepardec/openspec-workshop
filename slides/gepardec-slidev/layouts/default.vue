<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
import CornerSpots from '../components/CornerSpots.vue'
</script>

<template>
  <div class="gepardec-default slidev-layout">
    <div class="content">
      <slot />
    </div>

    <CornerSpots />
    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-default {
  padding: 3.5rem 4.5rem 4.5rem 4.5rem;
}

.content {
  position: relative;
  z-index: 2;
  /* Title and content sit naturally - no borders, no boxes.
     The first heading becomes the title, the rest is content. */
}

.content :deep(> h1:first-child),
.content :deep(> h2:first-child) {
  margin-bottom: 1.4rem;
}

/* Constrain content width so it doesn't run under the spots cluster */
.content :deep(> *) {
  max-width: 78%;
}
</style>
