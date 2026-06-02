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

---
layout: default
---

# Agenda

<div class="agenda mt-4 space-y-1 text-sm">
  <div class="agenda-row done">
    <span class="time">09:00 – 09:30</span>
    <span class="block-title">Warm-Up &amp; Erwartungen</span>
  </div>
  <div class="agenda-row">
    <span class="time">09:30 – 10:15</span>
    <span class="block-title"><span class="num">1</span> Was ist Spec-driven?</span>
  </div>
  <div class="agenda-row break">
    <span class="time">10:15 – 10:30</span>
    <span class="block-title">Kaffeepause</span>
  </div>
  <div class="agenda-row">
    <span class="time">10:30 – 11:30</span>
    <span class="block-title"><span class="num">2</span> Phasen &amp; Dokumente</span>
  </div>
  <div class="agenda-row">
    <span class="time">11:30 – 12:00</span>
    <span class="block-title"><span class="num">3</span> Setup &amp; Konfiguration</span>
  </div>
  <div class="agenda-row">
    <span class="time">12:00 – 12:30</span>
    <span class="block-title"><span class="num">4</span> CLI als Datei-Navigator + Quiz</span>
  </div>
  <div class="agenda-row break">
    <span class="time">12:30 – 13:30</span>
    <span class="block-title">Mittagspause</span>
  </div>
  <div class="agenda-row">
    <span class="time">13:30 – 14:15</span>
    <span class="block-title"><span class="num">5</span> CLI als Agent-Bridge + Live-Demo</span>
  </div>
  <div class="agenda-row">
    <span class="time">14:15 – 16:45</span>
    <span class="block-title"><span class="num">6</span> Hands-on Übungen</span>
  </div>
  <div class="agenda-row">
    <span class="time">16:45 – 17:30</span>
    <span class="block-title"><span class="num">7</span> Diskussion &amp; Wrap-up</span>
  </div>
</div>

<style scoped>
.agenda-row {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 0.75rem;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
}
.agenda-row:hover { background: rgba(255,255,255,0.04); }
.time {
  font-variant-numeric: tabular-nums;
  color: rgba(255,255,255,0.4);
  font-size: 0.78em;
  white-space: nowrap;
}
.block-title { color: rgba(255,255,255,0.85); }
.num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.3em;
  height: 1.3em;
  border-radius: 4px;
  background: rgba(255,255,255,0.08);
  font-size: 0.85em;
  font-weight: 700;
  margin-right: 0.4rem;
  color: rgba(255,255,255,0.6);
}
.agenda-row.break .time,
.agenda-row.break .block-title {
  color: rgba(255,255,255,0.3);
  font-size: 0.85em;
}
.agenda-row.done .time { color: rgba(255,255,255,0.25); }
.agenda-row.done .block-title {
  color: rgba(255,255,255,0.35);
  text-decoration: line-through;
  text-decoration-color: rgba(255,255,255,0.2);
}
</style>

<!--
Pausen sind Richtwerte — Kaffeepause am Nachmittag flexibel
nach Fortschritt der Hands-on-Übungen einlegen.
Punkte vom Whiteboard (Erwartungen aus Warm-Up) im Lauf
des Tages abhaken.
-->
