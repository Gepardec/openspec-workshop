#!/usr/bin/env python3
"""Erzeugt create-form.gs aus cli.md.

Aufruf aus dem Repo-Root: python3 docs/quiz/build-form-script.py
"""
import json
import re
from pathlib import Path

HERE = Path(__file__).parent
SOURCE = HERE / "cli.md"
TARGET = HERE / "create-form.gs"

# Sätze mit Trainer-Hinweisen gehören nicht ins Teilnehmer-Feedback.
TRAINER_ONLY = re.compile(r"Plenum|Überleitung|Kapitel")


def clean(text):
    """Markdown entfernen, Google Forms zeigt nur Klartext."""
    text = text.replace("**", "").replace("✓", "")
    text = re.sub(r"``\s*(.*?)\s*``", r"\1", text)
    text = text.replace("`", "")
    return re.sub(r"\s+", " ", text).strip()


def parse_question(block):
    lines = block.split("\n")
    number = lines[0].strip().removeprefix("Q")
    rest = "\n".join(lines[1:])
    question = rest.strip().split("\n\n")[0]
    options = re.findall(r"(?m)^- (.*)$", rest.split("```sh")[0])
    commands = re.search(r"```sh\n(.*?)```", rest, re.S).group(1)
    commands = [clean(re.sub(r"#.*", "", c)) for c in commands.strip().split("\n")]
    explanation = rest.split("```")[-1].strip()
    explanation = re.sub(r"\s*\(siehe Folie[^)]*\)", "", explanation)
    sentences = re.split(r"(?<=[.!?“])\s+(?=[A-ZÄÖÜ„`a-z])", explanation)
    explanation = clean(" ".join(s for s in sentences if not TRAINER_ONLY.search(s)))

    choices = []
    for option in options:
        correct = "✓" in option
        if correct:
            # Klammer-Erklärung hinter dem Häkchen gehört nicht zur Antwort
            option = re.sub(r"\s*✓.*$|\s*\(.*?\)\s*✓.*$", "", option)
        choices.append({"text": clean(option), "correct": correct})
    if sum(c["correct"] for c in choices) != 1:
        raise ValueError(f"Q{number}: genau eine richtige Antwort erwartet")

    feedback = "Befehl: " + " | ".join(commands)
    if explanation:
        feedback += "\n\n" + explanation
    return {"title": f"{number}. {clean(question)}", "choices": choices, "feedback": feedback}


def main():
    text = SOURCE.read_text()
    body = text[text.index("## Abschnitt 1"):]
    blocks = [re.split(r"(?m)^---\s*$", b)[0] for b in re.split(r"(?m)^### ", body)[1:]]
    questions = [parse_question(b) for b in blocks]
    data = json.dumps(questions, ensure_ascii=False, indent=2)
    TARGET.write_text(TEMPLATE.replace("__QUESTIONS__", data))
    print(f"{len(questions)} Fragen nach {TARGET} geschrieben")


TEMPLATE = """/**
 * Legt das Google-Form „OpenSpec CLI Quiz“ als Quiz mit Antwortschlüssel an.
 *
 * Generiert aus docs/quiz/cli.md mit docs/quiz/build-form-script.py.
 * Nicht von Hand ändern, sondern cli.md anpassen und neu erzeugen.
 *
 * Ausführen: script.google.com → Neues Projekt → Inhalt ersetzen → createQuiz ausführen.
 * Die Links zum Bearbeiten und Ausfüllen stehen danach im Ausführungsprotokoll.
 */
const QUESTIONS = __QUESTIONS__;

function createQuiz() {
  const form = FormApp.create('OpenSpec CLI Quiz');
  form
    .setIsQuiz(true)
    .setDescription(
      'Beantwortet alle Fragen mit der openspec CLI, ohne Dateien zu öffnen.\\n\\n' +
        'Vorbereitung im Repo-Root:\\n' +
        'git fetch && git switch workshop/quiz\\n\\n' +
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
"""

if __name__ == "__main__":
    main()
