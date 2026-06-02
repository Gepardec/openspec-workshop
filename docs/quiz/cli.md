# OpenSpec CLI Quiz

Jede Frage nennt den Befehl, der zur Antwort führt.
**(MC)** = Multiple Choice; **(SA)** = Kurzantwort.

---

## Abschnitt 1 — Changes erkunden (`openspec list`)

### Q1 (MC)
Wie viele aktive Changes gibt es aktuell?

- **1** ✓
- 2
- 5
- 6

```sh
openspec list
```

---

## Abschnitt 2 — Einen Change lesen (`openspec show <change>`)

### Q2 (SA)
Welche neue Capability führt `us-06-dashboard` ein?

**Antwort:** `dashboard`

```sh
openspec show us-06-dashboard
```

---

### Q3 (SA)
Welcher neue REST-Endpunkt wird in `us-06-dashboard` eingeführt?

**Antwort:** `GET /api/dashboard/spotlight`

```sh
openspec show us-06-dashboard
```

---

### Q4 (MC)
Aus wie vielen Tasks besteht der aktuelle Change?

- 12
- 14
- **16** ✓
- 19

```sh
openspec show us-06-dashboard oder openspec list --json
```

---

### Q5 (MC)
In wie viele Abschnitte ist das Artefakt `tasks.md` des aktuellen Changes unterteilt?

- 3
- 4
- **5** ✓ (Backend Data Model, Backend Spotlight Endpoint, Frontend Dashboard Domain, Frontend Dashboard Component, Frontend Routing & Navigation)
- 6

```sh
openspec show us-06-dashboard
```

---

## Abschnitt 3 — Artefaktstatus (`openspec status --change <change>`)

### Q6 (MC)
Wie viele Artefakte muss ein Change im `spec-driven`-Schema vollständig haben?

- 2
- 3
- **4** ✓ (proposal, specs, design, tasks)
- 5

```sh
openspec status --change us-06-dashboard
```

---

### Q7 (MC)
In welcher Reihenfolge werden die Artefakte im `spec-driven`-Schema erstellt?

- proposal → design → specs → tasks
- **proposal → specs → design → tasks** ✓
- specs → proposal → design → tasks
- design → proposal → specs → tasks

```sh
openspec schemas
```

---

## Abschnitt 4 — Schema & Konfiguration (`openspec schemas`)

### Q8 (SA)
Wie heißt das Workflow-Schema dieses Projekts?

**Antwort:** `spec-driven`

```sh
openspec schemas
```

---

## Abschnitt 5 — Bonus: Specifications

### Q9 (MC)
Wie viele Specifications sind im Hauptverzeichnis (`openspec/specs/`) umgesetzt?

- 4
- **5** ✓ (animal-list, animal-profile, animal-create, animal-edit, animal-delete)
- 6
- 8

```sh
ls openspec/specs/
```

---

### Q10 (MC)
Wie viele Requirements sind insgesamt in allen Specifications?

- 9
- 12
- **15** ✓
- 20

```sh
openspec view
```
