import { defineConfig } from 'unocss'

/**
 * Slidev generiert Utility-Klassen sonst erst, wenn ein Slide-Modul geladen
 * ist — beim `slidev export` ist das zu spät, der Export läuft gegen einen
 * kalten Dev-Server und die Folien kommen ohne die Klassen heraus.
 * Die Markdown-Dateien direkt zu scannen löst das: die Regeln stehen schon
 * beim Start im CSS.
 */
export default defineConfig({
  content: {
    filesystem: ['slides.md', 'pages/**/*.md'],
  },
})
