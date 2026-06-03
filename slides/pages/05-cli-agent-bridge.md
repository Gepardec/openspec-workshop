---
layout: section
---

# Die CLI als Agent-Bridge

---

# Die Lücke

Erinnert ihr euch: der Agent ist standardmäßig kontextblind.

Er weiß nicht, was entschieden wurde, was nicht verhandelbar ist, was als nächstes zu tun ist.

`openspec instructions` ist das Werkzeug dagegen.

---

# `openspec instructions`

Liefert dem Agenten Anweisungen für das Erstellen eines Artefakts — Template, Projekt-Kontext, Inhalte der Abhängigkeiten.

```sh
$ openspec instructions <artifact> --change us-06-dashboard
```

Gültige Argumente: `proposal` · `specs` · `design` · `tasks` · `apply`

`/opsx:propose` ruft diesen Befehl für jedes Artefakt auf. Sonderfall `apply`: liefert Implementierungsanweisungen für den aktiven Task.

---

# Was steckt in den Instructions?

```mermaid
flowchart LR
    T["Template\n(schema-spezifisch)"] --> IP
    C["config.yaml\nKonventionen"] --> IP
    A["Pfade zu fertigen\nAbhängigkeiten"] --> IP["instructions\nPrompt"]

    style IP fill:#1e40af,stroke:#3b82f6,color:#eff6ff
```

Der Agent liest die referenzierten Dateien selbst — `instructions` zeigt ihm nur, wo er schauen soll.

---

# Der Agent-Loop (`opsx:apply`)

```mermaid
flowchart LR
    INS["openspec instructions apply\nImplementierungskontext"] --> READ["KI liest\nKontext"]
    READ --> IMPL["KI implementiert\nTask"]
    IMPL --> CHECK{"Alle Tasks\nfertig?"}
    CHECK -->|nein| INS
    CHECK -->|ja| DONE["Du reviewst\nden Diff"]
```

`opsx:apply` ist der Skill, der diesen Loop ausführt — Task für Task, bis alle `[x]` sind.

Die CLI steuert den Loop. Der Agent erledigt die Arbeit. Du reviewst den Diff.

---

# Live-Demo

Was der Agent als Input bekommt — einmal pro Artefakt, einmal für die Implementierung.

```sh
# Während propose: Anweisungen zum Schreiben eines Artefakts
openspec instructions proposal --change us-06-dashboard
openspec instructions specs --change us-06-dashboard
openspec instructions design --change us-06-dashboard
openspec instructions tasks --change us-06-dashboard

# Während apply: Anweisungen zur Implementierung des nächsten Tasks
openspec instructions apply --change us-06-dashboard
```

<!--
Vergleich: Alle Tasks erledigt vs. alle Tasks offen
-->