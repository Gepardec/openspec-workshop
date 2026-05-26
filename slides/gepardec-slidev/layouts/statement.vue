<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
import CornerSpots from '../components/CornerSpots.vue'
</script>

<template>
  <div class="gepardec-statement slidev-layout">
    <div class="statement-content">
      <slot />
    </div>

    <CornerSpots :opacity="0.4" />
    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-statement {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem 5rem;
  text-align: left;
}

.statement-content {
  max-width: 75%;
  z-index: 2;
}

.statement-content :deep(h1) {
  font-size: 3.5rem;
  line-height: 1.1;
  color: var(--gepardec-white);
  font-weight: 400;
}

.statement-content :deep(h1 strong),
.statement-content :deep(strong) {
  color: var(--gepardec-yellow);
  font-weight: 500;
}

.statement-content :deep(p) {
  font-size: 1.2rem;
  color: var(--gepardec-white);
  margin-top: 1.5rem;
}
</style>
