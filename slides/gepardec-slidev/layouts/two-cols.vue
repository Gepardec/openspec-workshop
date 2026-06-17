<script setup lang="ts">
import GepardecLogo from '../components/GepardecLogo.vue'
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

    <GepardecLogo />
  </div>
</template>

<style scoped>
.gepardec-two-cols {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 4.5rem 4.5rem 4.5rem;
  gap: 1.4rem;
  height: 100%;
  overflow: hidden;
}

.title-area {
  z-index: 3;
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
  z-index: 3;
}

.col {
  min-width: 0;
  overflow: auto;
}
</style>
