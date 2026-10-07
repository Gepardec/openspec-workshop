/**
 * Legt das Google-Form „OpenSpec CLI Quiz“ als Quiz mit Antwortschlüssel an.
 *
 * Generiert aus docs/quiz/cli.md mit docs/quiz/build-form-script.py.
 * Nicht von Hand ändern, sondern cli.md anpassen und neu erzeugen.
 *
 * Ausführen: script.google.com → Neues Projekt → Inhalt ersetzen → createQuiz ausführen.
 * Die Links zum Bearbeiten und Ausfüllen stehen danach im Ausführungsprotokoll.
 */
const QUESTIONS = [
  {
    "title": "1. Wie viele Changes sind aktiv, also noch nicht archiviert?",
    "choices": [
      {
        "text": "1",
        "correct": false
      },
      {
        "text": "2",
        "correct": false
      },
      {
        "text": "3",
        "correct": true
      },
      {
        "text": "8",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec list\n\nUnter Changes: stehen drei Einträge. „Aktiv“ heißt nur: noch nicht archiviert. Auch us-06-dashboard mit Complete zählt dazu."
  },
  {
    "title": "2. Wie viele Changes sind bereits archiviert?",
    "choices": [
      {
        "text": "0",
        "correct": false
      },
      {
        "text": "3",
        "correct": false
      },
      {
        "text": "5",
        "correct": true
      },
      {
        "text": "6",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec list --archived\n\nAlle fünf tragen das Archivdatum im Namen: 2026-06-01-us-01-animal-list usw. openspec list --all zeigt aktive und archivierte Changes zusammen."
  },
  {
    "title": "3. In welcher Gruppe zeigt openspec view den Change us-06-dashboard?",
    "choices": [
      {
        "text": "Draft Changes",
        "correct": false
      },
      {
        "text": "Active Changes",
        "correct": false
      },
      {
        "text": "Completed Changes",
        "correct": true
      },
      {
        "text": "Gar nicht, weil er archiviert ist.",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec view\n\nAlle 16 Tasks sind abgehakt, deshalb „Completed“, archiviert ist er aber noch nicht."
  },
  {
    "title": "4. Welche neue Capability führt der Change us-07-feeding-times ein?",
    "choices": [
      {
        "text": "us-07-feeding-times",
        "correct": false
      },
      {
        "text": "animal-feeding",
        "correct": true
      },
      {
        "text": "animal-profile",
        "correct": false
      },
      {
        "text": "feeding-schedule",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec show us-07-feeding-times\n\nAbschnitt ### New Capabilities im ausgegebenen Proposal: animal-feeding: Daily feeding times of an animal, readable via REST. animal-profile steht unter ### Modified Capabilities: Diese Spec gibt es schon."
  },
  {
    "title": "5. Der Change remove-animal-notes entfernt das Feld notes. Welche Delta-Operation verwenden seine Delta-Specs?",
    "choices": [
      {
        "text": "REMOVED",
        "correct": false
      },
      {
        "text": "ADDED und REMOVED",
        "correct": false
      },
      {
        "text": "nur MODIFIED",
        "correct": true
      },
      {
        "text": "RENAMED",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec show remove-animal-notes --diff | openspec show remove-animal-notes --json --deltas-only\n\nUnter Specifications Changed (diffs) beginnt jeder Eintrag mit MODIFIED:. Die Requirements bleiben bestehen, nur ihr Text verliert notes. REMOVED würde das ganze Requirement löschen."
  },
  {
    "title": "6. Welche Haupt-Spec ändern sowohl remove-animal-notes als auch us-07-feeding-times?",
    "choices": [
      {
        "text": "animal-create",
        "correct": false
      },
      {
        "text": "animal-edit",
        "correct": false
      },
      {
        "text": "animal-profile",
        "correct": true
      },
      {
        "text": "dashboard",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec show remove-animal-notes --diff | openspec show us-07-feeding-times --diff\n\nSpec-Namen unter Specifications Changed (diffs). dashboard ist noch keine Haupt-Spec, sie entsteht erst beim Archivieren von us-06-dashboard."
  },
  {
    "title": "7. Beim Change us-07-feeding-times ist das Artefakt tasks blockiert. Auf welches Artefakt wartet es?",
    "choices": [
      {
        "text": "proposal",
        "correct": false
      },
      {
        "text": "specs",
        "correct": false
      },
      {
        "text": "design",
        "correct": true
      },
      {
        "text": "proposal und specs",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec status --change us-07-feeding-times\n\nZeile [-] tasks (blocked by: design), darüber Progress: 2/4 artifacts complete. Blockiert ist ein Hinweis, keine Sperre."
  },
  {
    "title": "8. Welchen Befehl nennt openspec status als nächsten Schritt für us-07-feeding-times?",
    "choices": [
      {
        "text": "openspec instructions tasks --change \"us-07-feeding-times\" --json",
        "correct": false
      },
      {
        "text": "openspec instructions design --change \"us-07-feeding-times\" --json",
        "correct": true
      },
      {
        "text": "openspec instructions apply --change \"us-07-feeding-times\" --json",
        "correct": false
      },
      {
        "text": "openspec archive us-07-feeding-times",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec status --change us-07-feeding-times\n\nLetzte Zeile Next: …. Diesen Befehl ruft der Agent auf, um die Anleitung für design.md zu holen."
  },
  {
    "title": "9. Welcher Change fällt bei openspec validate --all --strict durch?",
    "choices": [
      {
        "text": "us-06-dashboard",
        "correct": false
      },
      {
        "text": "remove-animal-notes",
        "correct": false
      },
      {
        "text": "us-07-feeding-times",
        "correct": true
      },
      {
        "text": "keiner, alle bestehen die Validierung",
        "correct": false
      }
    ],
    "feedback": "Befehl: openspec validate --all --strict\n\nZeile ✗ change/us-07-feeding-times, Summe Totals: 7 passed, 1 failed (8 items)."
  },
  {
    "title": "10. Warum fällt us-07-feeding-times bei der Validierung durch?",
    "choices": [
      {
        "text": "Das Artefakt design.md fehlt.",
        "correct": false
      },
      {
        "text": "tasks.md fehlt.",
        "correct": false
      },
      {
        "text": "Ein Requirement enthält weder SHALL noch MUST.",
        "correct": false
      },
      {
        "text": "Ein Requirement hat kein Scenario.",
        "correct": true
      }
    ],
    "feedback": "Befehl: openspec validate --all --strict | openspec validate us-07-feeding-times\n\nZeile ✗ [ERROR] animal-feeding/spec.md: ADDED \"Feeding time per animal is unique\" must include at least one scenario. Fehlende Artefakte stören validate nicht, sie zeigt nur status (Q7)."
  }
];

function createQuiz() {
  const form = FormApp.create('OpenSpec CLI Quiz');
  form
    .setIsQuiz(true)
    .setDescription(
      'Beantwortet alle Fragen mit der openspec CLI, ohne Dateien zu öffnen.\n\n' +
        'Vorbereitung im Repo-Root:\n' +
        'git fetch && git switch workshop/quiz\n\n' +
        'Danach zurück mit: git switch main'
    )
    .setShuffleQuestions(false)
    .setAllowResponseEdits(false);

  QUESTIONS.forEach((q) => {
    const item = form.addMultipleChoiceItem();
    item
      .setTitle(q.title)
      .setRequired(true)
      .setPoints(1)
      .setChoices(q.choices.map((c) => item.createChoice(c.text, c.correct)));
    const feedback = FormApp.createFeedback().setText(q.feedback).build();
    item.setFeedbackForCorrect(feedback).setFeedbackForIncorrect(feedback);
  });

  Logger.log('Bearbeiten: ' + form.getEditUrl());
  Logger.log('Ausfüllen:  ' + form.getPublishedUrl());
}
