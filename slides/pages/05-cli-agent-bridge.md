---
layout: section
---

# Die CLI als Agent-Bridge

Die apply-Phase — `opsx:apply` und `openspec instructions` — 15 min

---

# Die Lücke

Erinnert ihr euch: der Agent ist standardmäßig kontextblind.

Er weiß nicht, was entschieden wurde, was nicht verhandelbar ist, was als nächstes zu tun ist.

`openspec instructions` ist das Werkzeug dagegen.

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

```mermaid
flowchart LR
    P["proposal.md\nChange-Zusammenfassung"] --> IP
    T["tasks.md\nAktive Task"] --> IP
    S["specs.md\nRelevante Specs"] --> IP
    D["design.md\nDesign-Constraints"] --> IP
    C["config.yaml\nProjekt-Konventionen"] --> IP["instructions\nPrompt"]

    style IP fill:#1e40af,stroke:#3b82f6,color:#eff6ff
```

Der Agent bekommt genau das, was er braucht – nicht mehr, nicht weniger.

---

# Der Agent-Loop (`opsx:apply`)

```mermaid
flowchart LR
    INS["openspec instructions\nKontext-Prompt"] --> READ["KI liest\nKontext"]
    READ --> IMPL["KI implementiert\nTask"]
    IMPL --> CHECK{"Alle Tasks\nfertig?"}
    CHECK -->|nein| INS
    CHECK -->|ja| DONE["Du reviewst\nden Diff"]
```

`opsx:apply` ist der Skill, der diesen Loop ausführt — Task für Task, bis alle `[x]` sind.

Die CLI steuert den Loop. Der Agent erledigt die Arbeit. Du reviewst den Diff.

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
