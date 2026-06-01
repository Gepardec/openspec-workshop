---
layout: section
---

# Moment 2: CLI als Agent-Bridge

Die apply-Phase — `opsx:apply` und `openspec instructions` — 15 min

---

# Die Lücke

KI-Agenten sind mächtig – aber **standardmäßig kontextblind**.

Sie wissen nicht:
- Was das Team letzte Woche entschieden hat
- Welche Constraints nicht verhandelbar sind
- Was der nächste konkrete Schritt ist

Die Spec ist die Antwort – aber nur, wenn der Agent sie lesen kann.

---

# `openspec instructions`

Generiert einen fokussierten Prompt, mit dem der Agent mit der Arbeit beginnt.

```sh
$ openspec instructions us-03-add-animal
```

Der Output ist ein strukturierter Prompt, der dem Agenten sagt:
- Welchen Change er implementieren soll
- Welche Task als nächstes dran ist
- Welche Specs und Design-Entscheidungen relevant sind

---

# Was steckt in den Instructions?

```
1. Change-Zusammenfassung (aus proposal)
2. Aktive Task (aus tasks.md)
3. Relevante Specs (aus specs.md)
4. Design-Constraints (aus design.md)
5. Projekt-Konventionen (aus openspec/config.yaml)
```

Der Agent bekommt genau das, was er braucht – nicht mehr, nicht weniger.

---

# Der Agent-Loop (`opsx:apply`)

```
openspec instructions → KI liest Kontext → KI implementiert Task
       ↑                                            ↓
       ←←←←←←←←←←←←←←←←←←←←←←←←← Task abgeschlossen
```

`opsx:apply` ist der Skill, der diesen Loop ausführt — Task für Task, bis alle `[x]` sind.

Die CLI steuert den Loop. Der Agent erledigt die Arbeit. Du reviewst den Diff.

---

# Warum das wichtig ist

- Der Agent kann keine Anforderungen halluzinieren – sie stehen in der Spec
- Entscheidungen sind nachvollziehbar – sie stehen im proposal
- Onboarding ist selbstständig möglich – `openspec show` ist die Antwort

Die Spec ist keine Dokumentation. **Sie ist das Arbeitsgedächtnis des Teams.**

---

# Live-Demo

Ein Change von `openspec list` bis zur Implementierung.

```sh
openspec list
openspec show us-03-add-animal
openspec status --change us-03-add-animal
openspec instructions us-03-add-animal
```

Dann: Output an einen KI-Agenten übergeben und zusehen.
