---
layout: default
---

# Warm-Up

Nehmt euch **5 Minuten** und überlegt euch kurz Antworten auf diese Fragen:

<div class="questions mt-6 space-y-3">
  <div v-click class="question-item">
    <span class="q-num">1</span>
    <span><strong>Wie nutzt ihr KI heute konkret?</strong> <span class="text-gray-400 text-sm">— ein Beispiel reicht</span></span>
  </div>
  <div v-click class="question-item">
    <span class="q-num">2</span>
    <span><strong>Habt ihr schon mit KI-Agenten gearbeitet</strong> — wie schaut euer Workflow dabei aus?</span>
  </div>
  <div v-click class="question-item">
    <span class="q-num">3</span>
    <span><strong>Was hat gut funktioniert,</strong> was hat euch überrascht oder gefehlt?</span>
  </div>
  <div v-click class="question-item">
    <span class="q-num">4</span>
    <span><strong>Was erwartet ihr euch</strong> vom heutigen Workshop-Tag?</span>
  </div>
</div>

<div class="mt-10">
  <Countdown :minutes="5" />
</div>

<style scoped>
.question-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border-left: 3px solid rgba(255,255,255,0.15);
}
.q-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  min-width: 1.6rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  font-size: 0.8rem;
  font-weight: 700;
}
</style>

---
layout: default
---

# Runde · Warm-Up

Jeder hat ca. **90 Sekunden** — teilt kurz eure Antworten.

<div class="mt-12">
  <Stopwatch :warn-at="13" label="Ziel: ~15 Minuten gesamt" />
</div>

<!--
Nach den ~90 Sekunden: Teilnehmer gebeten, ihre Erwartung (Frage 4) ans Whiteboard zu schreiben — während die nächste Person spricht. So bleibt die Runde flüssig.
Am Ende kurz über die gesammelten Punkte drübergehen und ggf. im Lauf des Tages abhaken.
-->
