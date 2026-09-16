/**
 * THE MAP — upstream OpenSpec surface  ->  the slides that depend on it.
 *
 * This is the analogue of APM's `.apm/docs-index.yml`, inverted: APM maps its
 * own source tree to its own docs. We map *someone else's* release surface to
 * *our* deck. It is a JS module rather than YAML only so the runner needs zero
 * dependencies and zero parser risk — the shape is still plain declarative data.
 *
 * Every entry answers one question: "if this moved upstream, which slide is
 * now possibly wrong, and what exactly did that slide claim?"
 *
 * Adding a claim = adding one `backs` entry. That is the whole maintenance cost.
 */

export const upstream = {
  owner: 'Fission-AI',
  repo: 'OpenSpec',
  pkg: '@fission-ai/openspec',
  tag: (version) => `v${version}`,
};

/**
 * Considered and deliberately NOT tracked. Recorded so a future reader knows
 * these were rejected, not overlooked (APM calls this `no_impact_paths`).
 */
export const noImpact = [
  'test/**', // internal test suite
  '.github/**', // upstream CI
  'website/**', // docs site plumbing, not doc content
  'docs-lab/**', // parallel from-scratch docs rewrite; still mostly stubs, not yet user-facing
  'openspec/**', // OpenSpec dogfooding its own changes
  '.changeset/**', // raw changeset files; we read the assembled CHANGELOG.md instead
  'README_OLD.md',
];

/**
 * kind:
 *   'cli-help'     - `openspec <argv> --help` run against a pinned version. The
 *                    actual contract, language-independent, no prose involved.
 *   'github-file'  - a file at the release tag, compared pinned-tag vs latest-tag.
 *   'github-issue' - issue/PR state, for slides that cite one.
 *
 * tier: 1 = mechanical surface (also covered by assertions.mjs)
 *       2 = prose docs (human judgement on the diff)
 *       4 = external fact
 */
export const sources = [
  // ---------------------------------------------------------------- tier 1
  {
    id: 'schema.spec-driven',
    tier: 1,
    kind: 'github-file',
    path: 'schemas/spec-driven/schema.yaml',
    backs: [
      { slide: 'slides/pages/02-phases-documents.md', claim: 'Vier Artefakte (proposal/specs/design/tasks); Pfeile sind Abhängigkeiten, keine Sperren; tasks baut auf specs UND design auf; design.md nur, wenn der Change es braucht ("create only if")' },
      { slide: 'slides/pages/04-cli-navigator.md', claim: 'openspec status zeigt 4 Artefakte, tasks blocked by design; blocked ist ein Hinweis, keine Sperre' },
    ],
  },
  { id: 'schema.tpl.proposal', tier: 1, kind: 'github-file', path: 'schemas/spec-driven/templates/proposal.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'proposal.md hat vier Abschnitte: Why, What Changes, Capabilities, Impact' }] },
  { id: 'schema.tpl.spec', tier: 1, kind: 'github-file', path: 'schemas/spec-driven/templates/spec.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: '### Requirement -> #### Scenario (WHEN/THEN), exakt 4 Hashtags, SHALL/MUST' }] },
  { id: 'schema.tpl.design', tier: 1, kind: 'github-file', path: 'schemas/spec-driven/templates/design.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'design.md: Ziele/Nicht-Ziele, Entscheidungen mit Alternativen, [Risk] -> Mitigation, Open Questions' }] },
  { id: 'schema.tpl.tasks', tier: 1, kind: 'github-file', path: 'schemas/spec-driven/templates/tasks.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'Pflichtformat "- [ ] X.Y Task", nummerierte Gruppen-Überschriften' }] },
  { id: 'src.profiles', tier: 1, kind: 'github-file', path: 'src/core/profiles.ts',
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'Profil-Tabelle, Zeile core = propose/explore/apply/update/sync/archive' }] },
  { id: 'src.global-config', tier: 1, kind: 'github-file', path: 'src/core/global-config.ts',
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'Profil-Tabelle nennt genau zwei Profile: core und custom' }] },

  // CLI surface — one entry per command the deck actually types on a slide.
  { id: 'cli.root', tier: 1, kind: 'cli-help', argv: [],
    backs: [{ slide: 'slides/pages/04-cli-navigator.md', claim: 'Befehlsinventar insgesamt' }] },
  { id: 'cli.init', tier: 1, kind: 'cli-help', argv: ['init'],
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'openspec init ist interaktiv, fragt nach AI-Tools, ist erneut ausführbar' }] },
  { id: 'cli.list', tier: 1, kind: 'cli-help', argv: ['list'],
    backs: [{ slide: 'slides/pages/04-cli-navigator.md', claim: 'openspec list; --specs listet Haupt-Specs; --json; Beispielausgabe "No tasks" / "✓ Complete"' }] },
  { id: 'cli.show', tier: 1, kind: 'cli-help', argv: ['show'],
    backs: [{ slide: 'slides/pages/04-cli-navigator.md', claim: 'openspec show <change> gibt proposal.md aus; --type spec <name> zeigt eine Haupt-Spec; --json maschinenlesbar' }] },
  { id: 'cli.status', tier: 1, kind: 'cli-help', argv: ['status'],
    backs: [{ slide: 'slides/pages/04-cli-navigator.md', claim: 'openspec status --change <change>; Ausgabe mit Change root, Artefakte in Schema-Reihenfolge' }] },
  { id: 'cli.view', tier: 1, kind: 'cli-help', argv: ['view'],
    backs: [{ slide: 'slides/pages/04-cli-navigator.md', claim: 'openspec view ist interaktiv, kein JSON-Output' }] },
  { id: 'cli.validate', tier: 1, kind: 'cli-help', argv: ['validate'],
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'openspec validate --all --strict; --strict für CI' }] },
  { id: 'cli.archive', tier: 1, kind: 'cli-help', argv: ['archive'],
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'openspec archive <change> ist deterministisch, merged Deltas, räumt auf, schreibt History' }] },
  { id: 'cli.instructions', tier: 1, kind: 'cli-help', argv: ['instructions'],
    backs: [{ slide: 'slides/pages/05-cli-agent-bridge.md', claim: 'Gültige Argumente: proposal · specs · design · tasks, dazu apply und archive' }] },
  { id: 'cli.config', tier: 1, kind: 'cli-help', argv: ['config'],
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'openspec config profile wechselt interaktiv das Profil' }] },
  { id: 'cli.completion', tier: 1, kind: 'cli-help', argv: ['completion'],
    backs: [{ slide: 'slides/pages/04-cli-navigator.md', claim: 'openspec completion install für Shell-Autocompletion' }] },

  // ---------------------------------------------------------------- tier 2
  { id: 'docs.cli', tier: 2, kind: 'github-file', path: 'docs/cli.md',
    backs: [
      { slide: 'slides/pages/04-cli-navigator.md', claim: 'Gesamtes Kapitel "CLI als Datei-Navigator"' },
      { slide: 'slides/pages/05-cli-agent-bridge.md', claim: 'openspec instructions Verhalten' },
    ] },
  { id: 'docs.agent-contract', tier: 2, kind: 'github-file', path: 'docs/agent-contract.md',
    backs: [{ slide: 'slides/pages/05-cli-agent-bridge.md', claim: 'Instructions = Template + config.yaml + Pfade zu Abhängigkeiten; Agent liest referenzierte Dateien selbst' }] },
  { id: 'docs.getting-started', tier: 2, kind: 'github-file', path: 'docs/getting-started.md',
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'Was init anlegt: openspec/{config.yaml,specs,changes} + .claude/skills + .claude/commands/opsx; AGENTS.md/CLAUDE.md werden NICHT angelegt' }] },
  { id: 'docs.customization', tier: 2, kind: 'github-file', path: 'docs/customization.md',
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'config.yaml: schema + context; optional rules pro Artefakt-Typ' }] },
  { id: 'docs.supported-tools', tier: 2, kind: 'github-file', path: 'docs/supported-tools.md',
    backs: [
      { slide: 'slides/pages/01-what-why.md', claim: '30+ Tools werden bei init verdrahtet; Skills + Slash-Commands tool-spezifisch generiert' },
      { slide: 'slides/pages/03-setup-config.md', claim: 'Claude Code, Codex, Copilot, OpenCode, ... 30+ Optionen, Mehrfachauswahl' },
    ] },
  { id: 'docs.concepts', tier: 2, kind: 'github-file', path: 'docs/concepts.md',
    backs: [
      { slide: 'slides/pages/01-what-why.md', claim: 'brownfield-first; Deltas ADDED/MODIFIED/REMOVED; Archivieren arbeitet Deltas in Haupt-Specs ein' },
      { slide: 'slides/pages/02-phases-documents.md', claim: 'Was gilt — und was kommt: specs/ = Wahrheit, changes/ = Vorschläge; archive arbeitet Deltas ein und legt den Change vollständig und datiert ins Archiv' },
    ] },
  { id: 'docs.overview', tier: 2, kind: 'github-file', path: 'docs/overview.md',
    backs: [
      { slide: 'slides/pages/01-what-why.md', claim: 'Lohnt sich der Mehraufwand? Fehler früh abfangen (400 Zeilen), Das Warum bleibt (sechs Monate), Review ohne Chat-Archäologie, kein Big-Bang-Dokumentieren (50.000 Zeilen)' },
      { slide: 'slides/pages/01-what-why.md', claim: 'Statement: beim trivialen Ein-Zeilen-Fix lohnt die Zeremonie nicht; überall, wo Einigkeit zählt, schon' },
    ] },
  { id: 'docs.glossary', tier: 2, kind: 'github-file', path: 'docs/glossary.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'Begriffe: Spec, Haupt-Specs (source of truth), Change, Artefakt, Delta-Spec, Capability; Requirement (Was, nicht Wie), Scenario (prüfbar), RFC-2119-Stufen' }] },
  { id: 'docs.workflows', tier: 2, kind: 'github-file', path: 'docs/workflows.md',
    backs: [
      { slide: 'slides/pages/02-phases-documents.md', claim: 'Ablauf explore -> propose -> apply -> sync -> archive' },
      { slide: 'slides/pages/02-phases-documents.md', claim: 'Aktionen, keine Phasen: Review <-> update, apply -> update bei Planänderung, verify optional; explore optional' },
    ] },
  { id: 'docs.opsx', tier: 2, kind: 'github-file', path: 'docs/opsx.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'Die /opsx:* Slash-Commands und was sie tun' }] },
  { id: 'docs.explore', tier: 2, kind: 'github-file', path: 'docs/explore.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'explore ist kein Pflichtschritt, Denkpartner vor den Artefakten' }] },
  { id: 'docs.writing-specs', tier: 2, kind: 'github-file', path: 'docs/writing-specs.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'Delta-Specs: drei Sektionen ADDED/MODIFIED/REMOVED; Szenarien brauchen exakt 4 Hashtags' }] },
  { id: 'docs.installation', tier: 2, kind: 'github-file', path: 'docs/installation.md',
    backs: [
      { slide: 'slides/pages/04-cli-navigator.md', claim: 'npm install -g @fission-ai/openspec@latest' },
      { slide: 'exercises/01_init_openspec/README.md', claim: 'Installationsschritt der Übung 1' },
    ] },
  { id: 'docs.how-commands-work', tier: 2, kind: 'github-file', path: 'docs/how-commands-work.md',
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'CLI vs. Slash-Command: openspec läuft im Terminal, /opsx im Agenten-Chat' }] },
  { id: 'docs.reviewing-changes', tier: 2, kind: 'github-file', path: 'docs/reviewing-changes.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'Review-Reihenfolge proposal → spec → design → tasks; worauf beim Review achten' }] },
  { id: 'docs.existing-projects', tier: 2, kind: 'github-file', path: 'docs/existing-projects.md',
    backs: [{ slide: 'slides/pages/01-what-why.md', claim: 'brownfield-first: Specs wachsen Change für Change, kein Big-Bang-Dokumentieren' }] },

  // Generated agent-facing text. The deck quotes these verbatim on slides.
  { id: 'skill.propose', tier: 2, kind: 'github-file', path: 'skills/openspec-propose/SKILL.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'propose darf design.md überspringen, wenn dessen Instruction es als bedingt markiert ("enablers, not gates")' }, { slide: 'slides/pages/03-setup-config.md', claim: 'Auszug aus .claude/commands/opsx/propose.md: "Create the change directory -> openspec new change", "Get the artifact build order -> openspec status --change --json"' }] },
  { id: 'skill.apply', tier: 2, kind: 'github-file', path: 'skills/openspec-apply-change/SKILL.md',
    backs: [{ slide: 'slides/pages/05-cli-agent-bridge.md', claim: 'opsx:apply führt den Loop Task für Task aus, bis alle [x] sind' }] },
  { id: 'skill.archive', tier: 2, kind: 'github-file', path: 'skills/openspec-archive-change/SKILL.md',
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: 'Der opsx:archive-Skill macht dasselbe wie die CLI, aber LLM-gesteuert (mkdir/mv/Spec-Vergleich von Hand)' }] },
  { id: 'skill.explore', tier: 2, kind: 'github-file', path: 'skills/openspec-explore/SKILL.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'explore = Frage-Antwort-Runden, noch kein Artefakt' }] },
  { id: 'skill.sync', tier: 2, kind: 'github-file', path: 'skills/openspec-sync-specs/SKILL.md',
    backs: [{ slide: 'slides/pages/02-phases-documents.md', claim: 'sync ist der Schritt, in dem aus einem Change dauerhaftes Wissen wird' }] },

  // ---------------------------------------------------------------- tier 4
  // Expectation lives in assertions.mjs (deckClaims.issue863State) — single source of truth.
  { id: 'issue.863', tier: 4, kind: 'github-issue', number: 863,
    backs: [{ slide: 'slides/pages/03-setup-config.md', claim: '#863 ist geschlossen; der Skill erledigt Vergleich und mv trotzdem selbst' }] },
];
