<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
import CornerSpots from '../components/CornerSpots.vue'
</script>

<template>
  <div class="gepardec-end slidev-layout">
    <div class="end-content">
      <slot>
        <h1>Danke.</h1>
      </slot>
    </div>

    <CornerSpots :opacity="0.55" />
    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-end {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem 5rem;
}

.end-content {
  z-index: 2;
  max-width: 70%;
}

.end-content :deep(h1) {
  font-size: 5rem;
  line-height: 1.05;
  color: var(--gepardec-yellow);
  margin: 0;
}

.end-content :deep(p) {
  font-size: 1.4rem;
  color: var(--gepardec-white);
  margin-top: 1rem;
}
</style>
