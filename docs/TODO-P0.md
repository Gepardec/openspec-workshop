# P0 – Beispiele & Schulungsumgebung nachziehen

> **Zeitpunkt:** ganz am Schluss, unmittelbar vor dem nächsten Durchlauf.
> Inhaltliche Arbeit am Deck (P1) passiert vorher — diese Punkte hängen davon ab,
> wie Übungen und Deck am Ende aussehen, und würden sonst doppelt gemacht.
>
> **Warum P0:** ohne diese drei Punkte bricht der Teilnehmerpfad. Alles andere
> ist Qualität, das hier ist Funktionsfähigkeit.

---

## 1. Bare-Zustand für Übung 1 herstellen

**Problem:** `exercises/01_init_openspec/README.md` lässt Teilnehmer `openspec init` im
Repo-Root ausführen, um zu sehen, "was OpenSpec aus einem leeren Repo macht". Auf `main`
existiert `openspec/` aber bereits (inkl. `changes/archive/` mit sechs Changes), ebenso
`.claude/`, `.codex/`, `.junie/`, `.cursor/`, `.github/`, `.agent/`, `.agents/`, `.opencode/`.
Der Branch `start` ist **nicht** bare — er enthält `openspec/` ebenfalls. Ein Branch
`workshop/00-bare` existiert weder lokal noch auf `origin`.

Zusätzlich cloned das Ansible-Playbook (`Schulungsumgebung/playbook.yaml`, Task
"Clone OpenSpec Repo") ohne Branch-Angabe — also `main`.

**To-do:**
- [ ] Branch `workshop/00-bare` anlegen: ohne `openspec/`, ohne die Agent-Verzeichnisse,
      mit App + `exercises/` + `docs/`
- [ ] `exercises/01_init_openspec/README.md` auf diesen Branch umstellen (Checkout-Schritt ergänzen)
- [ ] Quiz-Slide `slides/pages/04-cli-navigator.md` — Schritt 1 sagt aktuell
      "`main`-Branch auschecken"; muss zum neuen Ablauf passen
- [ ] Playbook: entweder `version:` auf den Bare-Branch setzen oder den Checkout
      als ersten Übungsschritt belassen (bewusst entscheiden)

---

## 2. Bekannte Bugs im Übungspfad fixen

Beide sind bereits als Speaker-Note im Deck markiert.

- [ ] **Übung 2 – Kopierbefehl funktioniert nicht.**
      `exercises/02_setup_openspec/README.md`: `cp -r exercises/02_setup_openspec/openspec/ .`
      Note in `slides/pages/08-hands-on.md`: *"CLI-Befehl zum kopieren funktioniert nicht!"*
      → Befehl korrigieren und einmal auf einem frischen Clone durchspielen.
- [ ] **Quiz-Frage 1 ist fachlich falsch.**
      Note in `slides/pages/04-cli-navigator.md`: *"Frage 1: Change ist nicht aktiv,
      sondern completed. AUSBESSERN!"*
      → Frage im Google-Form korrigieren, danach Speaker-Note entfernen.

---

## 3. Agenten-Story in der Schulungsumgebung geradeziehen

**Problem:** Die Umgebung liegt auf `feature/schulungsumgebung` und ist **nicht gemerged**.
`playbook.yaml` provisioniert VS Code + Codex (`.codex/auth.json` mit `OPENAI_API_KEY`) —
**kein Claude Code, kein IntelliJ/Junie**. Dem stehen gegenüber:

- Speaker-Note in `slides/pages/08-hands-on.md`: *"mindestens Claude Code, Codex und Junie zu installieren"*
- `exercises/06_explore_requirements` + Slide: Tipp auf Skill `frontend-design` → Claude Code
- `slides/pages/03-setup-config.md` zeigt `.claude/skills/` und `CLAUDE.md` als Beispiel
- Angebot (`docs/offer.md`): "Die Arbeitsumgebung wird als virtuelle Umgebung bereitgestellt —
  keine lokale Installation nötig"

**To-do — eine der beiden Richtungen wählen und konsequent durchziehen:**
- [ ] **A) Multi-Agent:** Playbook installiert Claude Code **und** Codex (Junie streichen —
      IntelliJ ist nicht in der Umgebung). API-Zugang für beide klären.
- [ ] **B) Codex-only:** Deck und Übungen Codex-only formulieren, `frontend-design`-Tipp
      streichen, `.claude/`-Beispiele im Setup-Kapitel entsprechend einordnen.
- [ ] Danach: `feature/schulungsumgebung` nach `main` mergen
- [ ] Einen kompletten Durchlauf auf einer frisch provisionierten Instanz durchspielen
      (Übung 1 bis 6, inkl. Token-/Budget-Realität)

---

## Querverweis

Inhaltliche Lücken gegenüber dem Angebot (Qualitätsnetz-Block, Sync, garantierter
Full-Loop, Konventions-Übung) sind **P1** und laufen unabhängig von dieser Liste.
