/**
 * COVERAGE LEDGER — one explicit verdict per upstream item.
 *
 * `inventory.mjs` enumerates what exists. This file records what you decided
 * about each thing. An item the probes find that has no entry here is reported
 * as NEW — that is the whole mechanism for catching *additions*, which hashing
 * structurally cannot do.
 *
 * Verdicts:
 *   taught(where)      - a slide actually teaches it
 *   mentioned(where)   - named in passing, or in a presenter note
 *   skip(why)          - deliberately not in the workshop; the why is required
 *
 * `skip` is a real decision, not a dismissal: it is what stops the same item
 * resurfacing every run. Write the reason for the version of you that reads
 * this in a year.
 *
 * Keys are `<probe id>:<item>`.
 */

const taught = (where) => ({ verdict: 'taught', where });
const mentioned = (where) => ({ verdict: 'mentioned', where });
const skip = (why) => ({ verdict: 'out-of-scope', why });

const S1 = 'slides/pages/01-what-why.md';
const S2 = 'slides/pages/02-phases-documents.md';
const S3 = 'slides/pages/03-setup-config.md';
const S4 = 'slides/pages/04-cli-navigator.md';
const S5 = 'slides/pages/05-cli-agent-bridge.md';
const S8 = 'slides/pages/08-hands-on.md';
const S9 = 'slides/pages/09-discussion.md';

// Stores, references, working context and worksets ship together and their own
// guide calls them beta: "command names, flags, file formats, and JSON output
// may still change shape between releases". Teaching that in a workshop buys
// rework at every OpenSpec release.
const BETA = 'gehört zum Stores-Beta (laut eigener Doku instabil zwischen Releases) — nichts, was man Teilnehmern beibringen will';

export const coverage = {
  // ------------------------------------------------- CLI: top-level commands
  'cli.command:init': taught(S3),
  'cli.command:list': taught(S4),
  'cli.command:show': taught(S4),
  'cli.command:status': taught(S4),
  'cli.command:view': taught(S4),
  'cli.command:validate': taught(S3),
  'cli.command:archive': taught(S3),
  'cli.command:instructions': taught(S5),
  'cli.command:config': taught(S3),
  'cli.command:completion': taught(S4),
  'cli.command:new': taught(S2),
  'cli.command:update': mentioned(S2), // Notes verify-Folie: nach `config profile` die Skills neu schreiben; dazu Profil-Folie S3
  'cli.command:change': skip('`change list` ist zugunsten von `openspec list` deprecated, `change show` dupliziert `show`'),
  'cli.command:spec': skip('liefert dieselben Daten wie `list --specs` und `show --type spec`, die die Folien zeigen'),
  'cli.command:schema': skip('von OpenSpec als [experimental] markiert; im Workshop gibt es nur spec-driven'),
  'cli.command:store': skip(BETA),
  'cli.command:doctor': skip(BETA),
  'cli.command:context': skip(BETA),
  'cli.command:workset': skip(BETA),
  'cli.command:feedback': skip('Feedback an die Maintainer, kein Inhalt für Teilnehmer'),
  'cli.command:templates': skip('Debug-Hilfe für Schema-Autoren; im Workshop gibt es nur spec-driven'),
  'cli.command:schemas': skip('listet verfügbare Schemas; im Workshop gibt es nur spec-driven'),

  // ------------------------------------------------------ CLI: subcommands
  'cli.subcommand:config profile': taught(S3),
  'cli.subcommand:completion install': taught(S4),
  'cli.subcommand:new change': taught(S2),
  'cli.subcommand:config path': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:config list': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:config get': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:config set': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:config unset': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:config reset': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:config edit': skip('globale Config-Verwaltung, für den Workshop irrelevant'),
  'cli.subcommand:completion generate': skip('`install` reicht; `generate` ist der Unterbau davon'),
  'cli.subcommand:completion uninstall': skip('`install` reicht'),
  'cli.subcommand:change show': skip('Entscheidung fällt bei cli.command:change'),
  'cli.subcommand:change list': skip('Entscheidung fällt bei cli.command:change'),
  'cli.subcommand:change validate': skip('Entscheidung fällt bei cli.command:change'),
  'cli.subcommand:spec show': skip('Entscheidung fällt bei cli.command:spec'),
  'cli.subcommand:spec list': skip('Entscheidung fällt bei cli.command:spec'),
  'cli.subcommand:spec validate': skip('Entscheidung fällt bei cli.command:spec'),
  'cli.subcommand:schema which': skip('Entscheidung fällt bei cli.command:schema'),
  'cli.subcommand:schema validate': skip('Entscheidung fällt bei cli.command:schema'),
  'cli.subcommand:schema fork': skip('Entscheidung fällt bei cli.command:schema'),
  'cli.subcommand:schema init': skip('Entscheidung fällt bei cli.command:schema'),
  'cli.subcommand:store setup': skip('Entscheidung fällt bei cli.command:store'),
  'cli.subcommand:store register': skip('Entscheidung fällt bei cli.command:store'),
  'cli.subcommand:store unregister': skip('Entscheidung fällt bei cli.command:store'),
  'cli.subcommand:store remove': skip('Entscheidung fällt bei cli.command:store'),
  'cli.subcommand:store list': skip('Entscheidung fällt bei cli.command:store'),
  'cli.subcommand:store doctor': skip('Entscheidung fällt bei cli.command:store'),

  // ------------------------------------------- openspec/config.yaml keys
  'config.key:schema': taught(S3),
  'config.key:context': taught(S3),
  'config.key:rules': taught(S3),
  'config.key:operations': taught(S3), // per-Operation guidance für apply/archive
  'config.key:store': skip(BETA),
  'config.key:githubCopilot': skip('setzt `init`, wenn man den Copilot-Cloud-Agent wählt; reines Tool-Detail'),

  // ------------------------------------------- .openspec.yaml change metadata
  'change-meta.key:skip_specs': taught(S2), // propose-Folie: ohne Verhaltensänderung entstehen keine Specs
  'change-meta.key:schema': skip('schreibt die CLI selbst beim Anlegen des Change'),
  'change-meta.key:created': skip('schreibt die CLI selbst beim Anlegen des Change'),
  'change-meta.key:goal': skip('beschreibende Metadaten, ändern kein Verhalten'),
  'change-meta.key:affected_areas': skip('beschreibende Metadaten, ändern kein Verhalten'),
  'change-meta.key:initiative': skip(BETA),
  'change-meta.key:retire_capabilities': mentioned(S2), // Notes der Delta-Specs-Folie: letztes REMOVED einer Capability

  // ----------------------------------------------------------- Workflows
  'workflow:propose': taught(S2),
  'workflow:explore': taught(S2),
  'workflow:apply': taught(S2),
  'workflow:sync': taught(S2),
  'workflow:archive': taught(S2),
  'workflow:update': mentioned(S2),
  'workflow:new': mentioned(S3),
  'workflow:continue': mentioned(S3),
  'workflow:ff': mentioned(S3),
  'workflow:verify': taught(S2), // Folie „opsx:verify – der Abgleich“
  'workflow:bulk-archive': mentioned(S3),
  'workflow:onboard': mentioned(S3),

  // -------------------------------------------------- Dokumentationsseiten
  'docs.page:agent-contract.md': taught(S5),
  'docs.page:cli.md': taught(S4),
  'docs.page:concepts.md': taught(S2), // „Was gilt — und was kommt“, dazu brownfield/Deltas in S1
  'docs.page:customization.md': taught(S3),
  'docs.page:explore.md': taught(S2),
  'docs.page:getting-started.md': taught(S3),
  'docs.page:installation.md': taught(S4),
  'docs.page:opsx.md': taught(S2),
  'docs.page:supported-tools.md': taught(S1),
  'docs.page:workflows.md': taught(S2),
  'docs.page:writing-specs.md': taught(S2),
  'docs.page:how-commands-work.md': taught(S3), // = Folie "CLI vs. Slash-Command"
  'docs.page:reviewing-changes.md': taught(S2), // = Folien "Review-Time" / "Worauf achte ich beim Review?"
  'docs.page:existing-projects.md': taught(S1), // = Folie "Wächst mit dem Code"
  'docs.page:editing-changes.md': mentioned(S2), // "neue Runde drehen" deckt den Kern, die Seite ist breiter
  'docs.page:team-workflow.md': mentioned(S8), // Commit-Konventionen auf der Best-Practices-Folie, Teamfrage in der Diskussion
  'docs.page:multi-language.md': mentioned(S3), // `init --language`; die Frage "können die Specs deutsch sein?" kommt sicher
  'docs.page:README.md': skip('Inhaltsverzeichnis der Doku'),
  'docs.page:overview.md': taught(S1), // quadrants „Lohnt sich der Mehraufwand?“ + Statement zum Ein-Zeilen-Fix
  'docs.page:community.md': skip('Links zu Discord/Contributing'),
  'docs.page:glossary.md': taught(S2), // Folie „Begriffe“: core nouns + inside a spec
  'docs.page:faq.md': skip('Fragen kommen im Workshop live'),
  'docs.page:troubleshooting.md': skip('Support-Material, kein Foliencontent'),
  'docs.page:commands.md': skip('Referenz aller Slash-Commands; die fünf relevanten haben eigene Folien, opsx.md ist getrackt'),
  'docs.page:examples.md': skip('Rezepte von A bis Z — genau das sind die eigenen Übungen in exercises/'),
  'docs.page:migration-guide.md': skip('Umstieg vom Legacy-Workflow auf OPSX; Teilnehmer starten auf der grünen Wiese'),
  'docs.page:stores-beta/user-guide.md': skip(BETA),

  // ----------------------------------------------------------------- Skills
  'skill:openspec-propose': taught(S3),
  'skill:openspec-apply-change': taught(S5),
  'skill:openspec-archive-change': taught(S3),
  'skill:openspec-explore': taught(S2),
  'skill:openspec-sync-specs': taught(S2),
  'skill:openspec-update-change': taught(S2), // benannt auf der Review-Time-Folie
  'skill:openspec-verify-change': taught(S2), // was verify prüft und welche CLI-Aufrufe es nutzt
  'skill:openspec-new-change': mentioned(S3),
  'skill:openspec-continue-change': mentioned(S3),
  'skill:openspec-ff-change': mentioned(S3),
  'skill:openspec-bulk-archive-change': mentioned(S3),
  'skill:openspec-onboard': mentioned(S3),

  // ------------------------------------------------------- Workflow-Schemas
  'schema.workflow:spec-driven': taught(S2),
};
