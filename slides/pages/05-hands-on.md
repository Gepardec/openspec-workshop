---
layout: section
---

# Hands-on Übungen

---

# Setup

Repo klonen und CLI installieren:

```sh
git clone <repo-url>
cd openspec-workshop
npm install -g openspec   # oder: pnpm / yarn
```

App starten:

```sh
cd app/zoo-management
./mvnw quarkus:dev
```

---

# Übung 1 – Changes erkunden

Nutze `list`, `show` und `status`, um die sechs vorgeschlagenen Changes zu erkunden.

**Ziel:** Die Quiz-Fragen beantworten, ohne die Dateien direkt zu öffnen.

---

# Übung 2 – Einen Change implementieren

Wähle einen Change, der alle vier Artefakte vollständig hat.

```sh
openspec status --change <deine-wahl>
openspec instructions <deine-wahl>
```

Füge die Instructions in Claude Code (oder deinen bevorzugten KI-Assistenten) ein und implementiere die erste Task.

---

# Übung 3 – Eigenen Change vorschlagen

Denke dir ein kleines Feature für die Zoo-App aus. Nutze die CLI, um einen neuen Change zu erstellen:

```sh
openspec propose
```

Fülle den Proposal interaktiv aus und überprüfe die generierten Artefakte.
