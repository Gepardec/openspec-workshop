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
npm install -g @fission-ai/openspec@latest   # oder: pnpm / yarn
openspec --version
```

App starten:

```sh
cd app/zoo-management
./mvnw quarkus:dev
```

---

# Übung 0 – OpenSpec selbst aufsetzen

Wir setzen `openspec init` einmal selbst durch – auf einem Branch ohne vorkonfiguriertes Setup.

```sh
git checkout workshop/00-bare       # Repo ohne openspec/-Ordner
openspec init                       # interaktiv – Claude Code auswählen
```

**Schaut euch danach an, was angelegt wurde:**

```sh
ls openspec/
ls .claude/commands/opsx/
cat openspec/config.yaml
```

Anschließend zurück zur vorkonfigurierten Variante für alle weiteren Übungen:

```sh
git checkout main
```

<div class="text-xs text-white/50 mt-4">
Tipp: Lasst eure lokalen Änderungen am `00-bare`-Branch ruhig liegen – ihr könnt jederzeit zurückspringen und vergleichen.
</div>

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
