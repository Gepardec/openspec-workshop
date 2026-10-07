# Übung 3 – Einen aktiven Change archivieren

## Kontext

Der Change `us-06-dashboard` ist vollständig implementiert – ihr seht ihn in der App unter http://localhost:8080/dashboard.

## Ziel

Archiviert den Change direkt mit der CLI – ohne AI-Assistenten:

```sh
openspec archive us-06-dashboard
```

Lest, was die CLI vor dem Bestätigen anzeigt. Schaut euch danach an, was sich in `openspec/` verändert hat (`git status`, `openspec list --specs`).

## Erfolgskriterium

`openspec list` zeigt keine aktiven Changes mehr. Die Spec aus `us-06-dashboard` liegt als `openspec/specs/dashboard/spec.md` vor, der Change unter `openspec/changes/archive/`. `openspec validate --all --strict` meldet keine Fehler.
