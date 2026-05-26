<script setup lang="ts">
// Logo asset is bundled via Vite's import pipeline so it resolves correctly
// when this theme is consumed by any parent slide deck.
import logoUrl from '../assets/logo.png'
</script>

<template>
  <img
    class="gepardec-footer-logo"
    :src="logoUrl"
    alt="gepardec — simplify your business"
  />
</template>
