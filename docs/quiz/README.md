# CLI-Quiz

Quiz-Runde nach Kapitel 4 („Die CLI als Datei-Navigator“): 10 Multiple-Choice-Fragen, die die
Teilnehmer mit der openspec CLI beantworten, in rund 15 Minuten.

- **Ausfüllen:** https://docs.google.com/forms/d/e/1FAIpQLSf3liDyLSzmo1eE-5hVfGQ4gySCTiHg-mCbhx6FGZCNXAwXRA/viewform
- **Folie:** `slides/pages/04-cli-navigator.md` („Hands-on: Quiz-Runde“) mit QR-Code auf das Formular

## Dateien

| Datei | Inhalt |
| --- | --- |
| `cli.md` | Fragen, richtige Antworten und pro Frage der Befehl samt Stelle in der Ausgabe. Quelle für alles andere. |
| `build-form-script.py` | Erzeugt `create-form.gs` aus `cli.md`. |
| `create-form.gs` | Apps Script, das das Google-Form als Quiz mit Antwortschlüssel und Feedback anlegt. Generiert, nicht von Hand ändern. |

## Der Branch `workshop/quiz`

Die Teilnehmer beantworten das Quiz auf dem Branch `workshop/quiz`. Er enthält den App-Stand vor
den Übungen und ein `openspec/` mit drei aktiven Changes in unterschiedlichen Zuständen (siehe
Tabelle in `cli.md`). `main` taugt dafür nicht: Dort ist `openspec/` bis Übung 2 leer.

Dieses Verzeichnis gibt es auf `workshop/quiz` nicht, damit niemand die Antworten nachliest. Die
`README.md` im Repo-Root des Branches verlinkt das Formular, damit die Teilnehmer es am Laptop
direkt öffnen können.

## Quiz ändern

1. Fragen in `cli.md` anpassen. Format beibehalten: `### Q<n>`, Antworten als Liste, die
   richtige fett und mit ✓, danach ein `sh`-Block mit dem Befehl und die Erklärung.
   Sätze mit „Plenum“, „Überleitung“ oder „Kapitel“ gelten als Trainer-Hinweis und landen nicht
   im Feedback für die Teilnehmer.
2. Ändert eine Frage den OpenSpec-Stand, `workshop/quiz` nachziehen und jede Antwort mit dem
   genannten Befehl auf dem Branch prüfen.
3. Script neu erzeugen:

   ```sh
   python3 docs/quiz/build-form-script.py
   ```

4. Formular neu anlegen (siehe unten). Ein bestehendes Formular aktualisiert das Script nicht.
5. Neuen Ausfüll-Link auf der Folie, im QR-Code, hier und in der `README.md` von
   `workshop/quiz` eintragen.

## Formular anlegen

1. Auf [script.google.com](https://script.google.com) ein neues Projekt anlegen.
2. Inhalt von `create-form.gs` hineinkopieren und speichern.
3. Funktion `createQuiz` ausführen und den Zugriff auf Google Forms erlauben.
4. Im Ausführungsprotokoll stehen die Links zum Bearbeiten und zum Ausfüllen.

Das Formular landet in „Meine Ablage“ des ausführenden Kontos. Jede Frage zählt einen Punkt.
Je nach Quiz-Einstellung sehen die Teilnehmer nach dem Absenden pro Frage den Befehl und die
Stelle in der Ausgabe (Einstellungen → Quiz → „Für Teilnehmer sichtbar“).
