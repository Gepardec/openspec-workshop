<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
import CornerSpots from '../components/CornerSpots.vue'
</script>

<template>
  <div class="gepardec-two-cols slidev-layout">
    <div class="title-area">
      <slot name="title" />
    </div>

    <div class="cols">
      <div class="col col-left">
        <slot name="left" />
      </div>
      <div class="col col-right">
        <slot name="right" />
        <slot />
      </div>
    </div>

    <CornerSpots :opacity="0.5" />
    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-two-cols {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 4.5rem 4.5rem 4.5rem;
  gap: 1.4rem;
}

.title-area {
  z-index: 2;
}

.title-area :deep(h1),
.title-area :deep(h2) {
  margin: 0;
}

.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  flex: 1;
  min-height: 0;
  z-index: 2;
  /* Leave room on the right for the spots cluster */
  padding-right: 4%;
}

.col {
  min-width: 0;
  overflow: auto;
}
</style>
