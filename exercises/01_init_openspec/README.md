# Übung 1 – OpenSpec selbst aufsetzen

## Setup

Klont das Repo, installiert die CLI und startet die App:

```sh
git clone <repo-url>
cd openspec-workshop
npm install -g @fission-ai/openspec@latest
```

```sh
cd app/zoo-management
./mvnw quarkus:dev
```

## Ziel

Führt `openspec init` im Repo-Root aus und schaut euch an, was angelegt wird.

## Erfolgskriterium

`openspec/`, `openspec/config.yaml` und die Skills/Commands für euren AI-Assistenten existieren.
