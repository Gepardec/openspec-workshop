# User Story – Tierliste filtern

**Als** Zoo-Manager  
**möchte ich** die Tierliste nach Tierart filtern können,  
**damit** ich bei großen Zoos schnell alle Tiere einer bestimmten Art finde, ohne durch die gesamte Liste scrollen zu müssen.

## Akzeptanzkriterien

- In der Tierliste gibt es ein Filter-Dropdown oder eine Filter-Eingabe nach Tierart (species)
- Die Liste aktualisiert sich sofort beim Auswählen eines Filters
- Ein aktiver Filter ist klar erkennbar; er lässt sich mit einem Klick zurücksetzen
- Ist kein Filter aktiv, werden alle Tiere angezeigt

## Hinweise

- Die Filterung kann rein clientseitig erfolgen — keine neue API nötig
- Die bereits vorhandene `GET /api/animals`-Ressource liefert alle benötigten Daten
