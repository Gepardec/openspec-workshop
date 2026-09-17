# Feedback zum Theorieteil beim Kunden — was noch offen ist

> Stand 2026-09-17, direkt nach dem Termin. Deine Punkte habe ich in zwei Gruppen
> geteilt: was ich ohne Rücksprache umsetzen konnte, und was ich mit dir
> gemeinsam schärfen will. Die zweite Gruppe steht unten als A–F. Zu jedem Punkt
> habe ich aufgeschrieben, wie ich ihn sehe, und was ich von dir brauche. Unter
> **Ergebnis** halten wir fest, worauf wir uns einigen.

## Schon im Deck

- **Frage-Pausen** vor jedem Kapitel und einmal mitten in Kapitel 2 (nach den Artefakten, vor dem Review) — als Notiz für mich, nicht als eigene Folie
- **Need-to-know:** die Begriffsfolie ist aufgelöst, jeder Begriff kommt dort, wo er zum ersten Mal gebraucht wird. Die Ablaufgrafik erklärt die vier Artefakte mit je einem Wort (Warum · Was · Wie · To-do)
- **design.md** mit Beispielen für typische Entscheidungen
- **Architekturvorgaben** als eigene Folie: wo sie stehen (`config.yaml`, `design.md`) und wer sie durchsetzt (ArchUnit, ESLint …)
- **Sicherheitsnetz:** ArchUnit, ESLint, SonarQube/SonarLint, Prettier, Tests — als Harness-Thema, nicht als OpenSpec-Feature
- **Wo braucht es den Menschen?** Heute: explore, Plan-Review, Code-Review. Mit ausgereifter Harness: Code-Review automatisiert über `verify` und Sicherheitsnetz im Feedback-Loop
- **Was kostet ein Change?** Mit echten Zahlen statt Schätzung (Details unter D)
- **FAQ:** „Ab welcher Größe lohnt es sich?“ und „Frontend & Backend — wie?“ (MEGA als Beispiel, Stores als Zielbild)

---

## A — Für wen bauen wir das eigentlich?

**Was ich mitgenommen habe:** Der Teil, den ich gezeigt habe, ist aus einem
eintägigen Entwickler-Workshop geschnitten. Mehrere deiner Punkte — Demo first,
Use Cases zum Lenken, kaufmännische Zahlen — zielen aber auf ein anderes
Publikum: Entscheider:innen, die wissen wollen, ob sich das für ihr Produkt lohnt.

**Wie ich es sehe:** Ich würde zwei Formate trennen, die sich dieselben Folien teilen:

| | Entwickler-Workshop | Kundenvortrag |
|---|---|---|
| Publikum | Entwickler:innen, Tech Leads | Entscheider:innen, gemischte Runde |
| Dauer | ein Tag, mit Hands-on | 60–90 Minuten |
| Einstieg | Konzepte, dann Praxis | Demo, dann Erklärung |
| Ziel | selbst anwenden können | Entscheidung für einen nächsten Schritt |

Technisch ist das billig: die Kapitel liegen als eigene Dateien, ein zweiter
Vortrag bindet nur die passenden ein.

**Was ich von dir brauche:**
- Wer sitzt bei solchen Terminen typischerweise im Raum?
- Was soll am Ende des Kundenvortrags stehen — Workshop gebucht, Pilot vereinbart, Folgetermin?
- Passt die Trennung, oder soll der Workshop selbst auch „Demo first“ werden?

**Ergebnis:**

---

## B — Demo first: welcher Change, wie gezeigt?

**Was ich mitgenommen habe:** Zuerst ein konkreter Use Case mit Vorher/Nachher,
erst danach erklären, was passiert ist.

**Wie ich es sehe:** Ich habe zwei Kandidaten aus MEGA.

1. **Abrechnungsmonat** (Backend) — steckt schon im Deck, von explore bis archive.
   Schwäche: ein neuer Endpoint, kaum etwas zu *sehen*. Die Sessions liefen im
   April noch mit einem älteren Modell, die vollständigen Transkripte gibt es
   nicht mehr.
2. **Generierte API-Clients** (Frontend) — mein Favorit fürs Vorher/Nachher.
   *Vorher:* handgeschriebene API-Services, die still vom Backend abweichen. Das
   Proposal hat vier echte Abweichungen gefunden, darunter eine Methode für einen
   Endpoint, den es gar nicht gibt. *Nachher:* der Client wird aus dem API-Vertrag
   des Backends generiert, jede Abweichung ist ein Compile-Fehler. Lief mit dem
   aktuellen Modell, komplett gemessen, am selben Tag gemergt.

Live würde ich nicht demonstrieren: explore und propose haben real 75 Minuten
gedauert. Eher eine gekürzte Aufzeichnung oder eine Klickstrecke aus Screenshots —
Anforderung, Artefakte, Code-Diff, Ergebnis.

**Was ich von dir brauche:**
- Welcher Kandidat erzählt die bessere Geschichte für Kund:innen?
- Was meinst du mit „Bildern“: App-Screenshots, Code-Diff, Artefakte?
- Demo ganz an den Anfang oder nach einer kurzen Problemfolie („Wo es heute hakt“)?

**Ergebnis:**

---

## C — Welche Use Cases zeigen wir, um zu lenken?

**Was ich mitgenommen habe:** Neben der Demo ein paar Use Cases auf hoher Flughöhe,
etwa neues Feature und Technologie-Upgrade.

**Wie ich es sehe:**

| Use Case | Eigene Erfahrung | Einschätzung |
|---|---|---|
| Neues Feature | ja, MEGA | Kernfall, gut belegbar |
| Modernisierung: Legacy-Konzept in neue Architektur | ja, der Abrechnungsmonat ist genau das | starker Fall, weil Regeln aus dem Altcode hinterfragt werden |
| Versions-Upgrade (Framework X auf Version Y) | nein | meist Refactoring ohne neues Verhalten — OpenSpec gibt Struktur, der Hebel ist aber klein |
| Neu schreiben in neuer Technologie | nein | spannend: Verhalten des Altsystems als Spec festhalten, dann neu bauen. Braucht vorher eine Analyse des Bestands (siehe F) |

Ich würde nur zeigen, was wir mit eigener Erfahrung belegen können, und den Rest
offen als „das würden wir gern mit euch ausprobieren“ anbieten.

**Was ich von dir brauche:**
- Wohin wollen wir Kund:innen lenken? Das bestimmt, welche Use Cases vorne stehen.
- Gibt es Kundenprojekte, die wir als Referenz nennen dürfen?
- Wie offensiv dürfen wir mit Fällen umgehen, die wir selbst noch nicht gemacht haben?

**Ergebnis:**

---

## D — Kosten und Wirtschaftlichkeit

**Was ich mitgenommen habe:** Die Token-Schätzung kam gut an.

**Nachgemessen:** Meine Schätzung im Termin war 400–500k Tokens für 20–30 USD. Die
Kosten lagen damit in der richtigen Größenordnung, die Token-Menge um den Faktor
100 daneben. Gemessen am Frontend-Change aus B, mit API-Listenpreisen für Opus 5:

| Session | Tokens | Kosten |
|---|--:|--:|
| explore + propose | 15,0 Mio. | 12 USD |
| apply | 39,5 Mio. | 26 USD |
| archive | 1,4 Mio. | 2 USD |
| **Gesamt** | **56 Mio.** | **40 USD** |

Der Change hatte 31 Tasks und rund 1.000 neue Zeilen. 98 % der Tokens kommen aus
dem Cache; 70 % der Kosten entstehen, weil der Agent bei jedem Schritt den
bisherigen Kontext neu liest. Kurze Sessions sind also auch Kostendisziplin.

**Wie ich es sehe:** Die Zahl allein überzeugt noch niemanden. Offen ist, womit
wir sie vergleichen und wie ehrlich wir rechnen.

**Was ich von dir brauche:**
- API-Preis oder Abo/Seats — womit rechnen Kund:innen realistisch?
- Stellen wir die 40 USD einer Entwicklerstunde gegenüber? Dann gehört auch die Menschzeit für explore und Review in die Rechnung.
- Preise ändern sich — reicht ein Datum auf der Folie?
- Für „Ab welcher Größe lohnt es sich?“ hätte ich gern eine Zahl statt einer Faustregel. Dafür bräuchten wir mehr Messpunkte: Soll ich die Kosten bei jedem MEGA-Change mitschreiben?

**Ergebnis:**

---

## E — Was nehmen wir aus den Erkenntnissen des Kunden mit?

**Was ich gehört habe:**
- Leute, die in Richtung Requirements Engineering gerutscht sind, könnten wieder entwickeln.
- Das Berufsbild ändert sich — wer nur Schleifen schreiben will, bleibt auf der Strecke.
- Erwartet werden: bessere Dokumentation, besseres Testing, weniger Aufwand bei großen Änderungen.

**Wie ich es sehe:**
- **Dokumentation und Testing** kann ich belegen: Specs wachsen mit jedem Change mit, Scenarios werden zu Tests.
- **Weniger Aufwand bei großen Änderungen** kann ich nur mit Einzelfällen stützen, nicht mit Zahlen. Da wäre ich vorsichtig mit Versprechen.
- **Berufsbild:** eine starke Botschaft für Entscheider:innen, vor Entwickler:innen aber heikel. Im Workshop würde ich sie als Frage in die Diskussion geben, nicht als Folie.

**Was ich von dir brauche:**
- Wollen wir die Rollenverschiebung (RE ↔ Entwicklung) aktiv als Positionierung nutzen — im Vortrag, im Angebot, auf der Website?
- Welcher Ton passt zu Gepardec: Chance betonen oder Wandel nüchtern benennen?

**Ergebnis:**

---

## F — Welche Folgeangebote ergeben sich?

**Was ich gehört habe:**
- Der Kunde braucht Möglichkeiten, bestehende Produkte zu analysieren.
- Der Kunde sieht es als iterativen Prozess und will es am eigenen Produkt gemeinsam ausprobieren.

**Wie ich es sehe:**
- **Analyse des Bestands:** Dafür ist OpenSpec nicht das richtige Werkzeug, es gibt bessere. Die Analyse ist aber die Voraussetzung für den spannendsten Use Case aus C (neu schreiben). _(Werkzeuge noch ergänzen)_
- **Gemeinsam ausprobieren:** Das Angebot sagt heute nur „In-House auf Anfrage“. Ich stelle mir einen Pilot vor: ein echter Change im Produkt des Kunden, gemeinsam von explore bis archive, inklusive `config.yaml` für ihr Projekt und einem Blick auf ihr Sicherheitsnetz.

**Was ich von dir brauche:**
- Wird aus der Bestandsanalyse ein eigenes Angebot, oder bleibt sie Teil eines Piloten?
- Pilot: Dauer, Umfang, Preis — und wer außer mir kann das liefern?
- Wie hängen Workshop, Kundenvortrag und Pilot zusammen: Stufen eines Pfads oder einzeln buchbar?

**Ergebnis:**
