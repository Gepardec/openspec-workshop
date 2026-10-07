# Übung 1 – OpenSpec selbst aufsetzen

## Setup

Auf eurer Schulungs-VM ist alles vorbereitet: Das Repo liegt unter `~/openspec-workshop` (Branch `main`), die OpenSpec-CLI ist installiert. Prüft die Version (erwartet: 1.14.1 oder neuer) und startet die App:

```sh
cd ~/openspec-workshop
openspec --version
```

```sh
cd ~/openspec-workshop/app/zoo-management
./mvnw quarkus:dev
```

Die App läuft unter http://localhost:8080. Lasst sie in diesem Terminal laufen und öffnet für die Übungen ein zweites Terminal im Repo-Root.

## Ziel

Das Repo ist bereits mit `openspec init` eingerichtet: das `openspec/`-Verzeichnis und die Skills und Slash-Commands für Codex, Claude Code und GitHub Copilot. Damit ihr seht, was `init` in einem Projekt ohne OpenSpec anlegt, entfernt zuerst beides:

```sh
git rm -rq openspec '.*/skills/openspec-*' .agents/skills/.openspec-target .claude/commands/opsx '.github/prompts/opsx-*'
```

Die anderen Skills (z. B. `frontend-design`) bleiben erhalten.

Führt danach `openspec init` im Repo-Root aus und wählt die AI-Assistenten aus, mit denen ihr arbeitet (mehrere möglich; das Repo war für Codex, Claude Code und GitHub Copilot eingerichtet). Die Frage nach dem Copilot Cloud Agent könnt ihr mit Nein beantworten. Schaut euch mit `git status` an, was angelegt wurde – wählt ihr dieselben drei Tools, entsteht exakt der Stand von vorher.

## Erfolgskriterium

`openspec/` mit `config.yaml`, `specs/` und `changes/` existiert, ebenso die Skills (und, wo das Tool sie unterstützt, Slash-Commands) für eure AI-Assistenten – erzeugt von eurer CLI-Version.
