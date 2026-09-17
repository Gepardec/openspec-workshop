import { defineMermaidSetup } from '@slidev/types'

/**
 * Mermaid in Brand-Farben — zentral, damit kein Diagramm eigene `style`-Zeilen
 * mitschleppt. Schwarzer Grund, graue Knotenrahmen, gelbe Kanten.
 *
 * `look`, `layout` und `flowchart` explizit: Mermaid 12 (ab Slidev 53) nimmt
 * sonst `neo` (Schlagschatten), `elk` (eckige Kanten, breiteres Layout) und
 * 120px Mindestbreite je Knoten — die Diagramme laufen dann über den Slide.
 */
export default defineMermaidSetup(() => ({
  theme: 'base',
  look: 'classic',
  layout: 'dagre',
  flowchart: {
    minNodeWidth: 0,
    wrappingWidth: 200,
  },
  themeVariables: {
    darkMode: true,
    background: '#000000',

    // Knoten
    primaryColor: '#111111',
    primaryBorderColor: '#8a8a8a',
    primaryTextColor: '#ffffff',
    mainBkg: '#111111',
    nodeBorder: '#8a8a8a',
    nodeTextColor: '#ffffff',

    // Kanten und Labels
    lineColor: '#FFC800',
    textColor: '#d6d6d6',
    edgeLabelBackground: '#000000',

    // Cluster
    clusterBkg: '#0a0a0a',
    clusterBorder: '#3a3a3a',

    // Sequenzdiagramme: Nachrichten gelb wie die Kanten, Lebenslinien
    // gedimmt, damit sie nicht durch die Nachrichtentexte schneiden
    actorBkg: '#111111',
    actorBorder: '#8a8a8a',
    actorTextColor: '#ffffff',
    actorLineColor: '#3a3a3a',
    signalColor: '#FFC800',
    signalTextColor: '#d6d6d6',

    fontFamily: "'Barlow Semi Condensed', system-ui, sans-serif",
    fontSize: '16px',
  },
}))
