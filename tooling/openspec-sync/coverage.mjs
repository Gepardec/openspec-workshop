/**
 * COVERAGE LEDGER — one explicit verdict per upstream item.
 *
 * `inventory.mjs` enumerates what exists. This file records what you decided
 * about each thing. An item the probes find that has no entry here is reported
 * as NEW — that is the whole mechanism for catching *additions*, which hashing
 * structurally cannot do.
 *
 * Verdicts:
 *   taught       - a slide actually teaches it        -> `where`
 *   mentioned    - named in passing, not taught       -> `where`
 *   out-of-scope - deliberately not in the workshop   -> `why` (required)
 *
 * "out-of-scope" is a real decision, not a dismissal: it is what stops the same
 * item resurfacing every run. Write the `why` for the version of you that reads
 * this in a year.
 *
 * Keys are `<probe id>:<item>`.
 */

const S3 = 'slides/pages/03-setup-config.md';
const S4 = 'slides/pages/04-cli-navigator.md';
const S5 = 'slides/pages/05-cli-agent-bridge.md';
const S2 = 'slides/pages/02-phases-documents.md';

export const coverage = {
  // ------------------------------------------------- CLI: top-level commands
  'cli.command:init': { verdict: 'taught', where: S3 },
  'cli.command:list': { verdict: 'taught', where: S4 },
  'cli.command:show': { verdict: 'taught', where: S4 },
  'cli.command:status': { verdict: 'taught', where: S4 },
  'cli.command:view': { verdict: 'taught', where: S4 },
  'cli.command:validate': { verdict: 'taught', where: S3 },
  'cli.command:archive': { verdict: 'taught', where: S3 },
  'cli.command:instructions': { verdict: 'taught', where: S5 },
  'cli.command:config': { verdict: 'taught', where: S3 },
  'cli.command:completion': { verdict: 'taught', where: S4 },
  'cli.command:new': { verdict: 'taught', where: S2 },
  'cli.command:feedback': { verdict: 'out-of-scope', why: 'Feedback an die Maintainer, kein Inhalt für Teilnehmer' },
  'cli.command:templates': { verdict: 'out-of-scope', why: 'Debug-Hilfe für Schema-Autoren; im Workshop gibt es nur spec-driven' },
  'cli.command:schemas': { verdict: 'out-of-scope', why: 'listet verfügbare Schemas; im Workshop gibt es nur spec-driven' },

  // ------------------------------------------------------ CLI: subcommands
  'cli.subcommand:config profile': { verdict: 'taught', where: S3 },
  'cli.subcommand:completion install': { verdict: 'taught', where: S4 },
  'cli.subcommand:new change': { verdict: 'taught', where: S2 },
  'cli.subcommand:config path': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:config list': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:config get': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:config set': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:config unset': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:config reset': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:config edit': { verdict: 'out-of-scope', why: 'globale Config-Verwaltung, für den Workshop irrelevant' },
  'cli.subcommand:completion generate': { verdict: 'out-of-scope', why: 'install reicht; generate ist der Unterbau davon' },
  'cli.subcommand:completion uninstall': { verdict: 'out-of-scope', why: 'install reicht' },
  'cli.subcommand:schema which': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:schema' },
  'cli.subcommand:schema validate': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:schema' },
  'cli.subcommand:schema fork': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:schema' },
  'cli.subcommand:schema init': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:schema' },
  'cli.subcommand:store setup': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:store' },
  'cli.subcommand:store register': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:store' },
  'cli.subcommand:store unregister': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:store' },
  'cli.subcommand:store remove': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:store' },
  'cli.subcommand:store list': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:store' },
  'cli.subcommand:store doctor': { verdict: 'out-of-scope', why: 'Entscheidung fällt bei cli.command:store' },

  // ------------------------------------------- openspec/config.yaml keys
  'config.key:schema': { verdict: 'taught', where: S3 },
  'config.key:context': { verdict: 'taught', where: S3 },
  'config.key:rules': { verdict: 'mentioned', where: S3 },

  // ------------------------------------------- .openspec.yaml change metadata
  'change-meta.key:schema': { verdict: 'out-of-scope', why: 'schreibt die CLI selbst beim Anlegen des Change' },
  'change-meta.key:created': { verdict: 'out-of-scope', why: 'schreibt die CLI selbst beim Anlegen des Change' },

  // ----------------------------------------------------------- Workflows
  'workflow:propose': { verdict: 'taught', where: S2 },
  'workflow:explore': { verdict: 'taught', where: S2 },
  'workflow:apply': { verdict: 'taught', where: S2 },
  'workflow:sync': { verdict: 'taught', where: S2 },
  'workflow:archive': { verdict: 'taught', where: S2 },
  'workflow:update': { verdict: 'mentioned', where: S3 },
  'workflow:new': { verdict: 'mentioned', where: S3 },
  'workflow:continue': { verdict: 'mentioned', where: S3 },
  'workflow:ff': { verdict: 'mentioned', where: S3 },
  'workflow:verify': { verdict: 'mentioned', where: S3 },
  'workflow:bulk-archive': { verdict: 'mentioned', where: S3 },
  'workflow:onboard': { verdict: 'mentioned', where: S3 },

  // -------------------------------------------------- Dokumentationsseiten
  'docs.page:agent-contract.md': { verdict: 'taught', where: S5 },
  'docs.page:cli.md': { verdict: 'taught', where: S4 },
  'docs.page:concepts.md': { verdict: 'taught', where: 'slides/pages/01-what-why.md' },
  'docs.page:customization.md': { verdict: 'taught', where: S3 },
  'docs.page:explore.md': { verdict: 'taught', where: S2 },
  'docs.page:getting-started.md': { verdict: 'taught', where: S3 },
  'docs.page:installation.md': { verdict: 'taught', where: S4 },
  'docs.page:opsx.md': { verdict: 'taught', where: S2 },
  'docs.page:supported-tools.md': { verdict: 'taught', where: 'slides/pages/01-what-why.md' },
  'docs.page:workflows.md': { verdict: 'taught', where: S2 },
  'docs.page:writing-specs.md': { verdict: 'taught', where: S2 },
  'docs.page:README.md': { verdict: 'out-of-scope', why: 'Inhaltsverzeichnis der Doku' },
  'docs.page:overview.md': { verdict: 'out-of-scope', why: 'Einstiegsseite; Inhalt steckt in concepts.md' },
  'docs.page:community.md': { verdict: 'out-of-scope', why: 'Links zu Discord/Contributing' },
  'docs.page:glossary.md': { verdict: 'out-of-scope', why: 'Begriffe werden im Vortrag ohnehin eingeführt' },
  'docs.page:faq.md': { verdict: 'out-of-scope', why: 'Fragen kommen im Workshop live' },
  'docs.page:troubleshooting.md': { verdict: 'out-of-scope', why: 'Support-Material, kein Foliencontent' },

  // ----------------------------------------------------------------- Skills
  'skill:openspec-propose': { verdict: 'taught', where: S3 },
  'skill:openspec-apply-change': { verdict: 'taught', where: S5 },
  'skill:openspec-archive-change': { verdict: 'taught', where: S3 },
  'skill:openspec-explore': { verdict: 'taught', where: S2 },
  'skill:openspec-sync-specs': { verdict: 'taught', where: S2 },
  'skill:openspec-verify-change': { verdict: 'mentioned', where: 'slides/pages/07-discussion.md' },

  // ------------------------------------------------------- Workflow-Schemas
  'schema.workflow:spec-driven': { verdict: 'taught', where: S2 },
};
