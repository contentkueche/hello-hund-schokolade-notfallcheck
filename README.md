# Schokolade-Notfallcheck für Hunde

Der Schokolade-Notfallcheck ist eine browserbasierte Rechenhilfe für den tierärztlichen Anruf. Er ordnet Gewicht, geschätzte Menge und Schokoladenart anhand offengelegter Literaturwerte ein. Alle Eingaben und Berechnungen bleiben im geöffneten Browser.

[Notfallcheck, ausführliche Grenzen und Quellen bei Hello Hund](https://hello-hund.de/schokolade-hund-notfallcheck/?utm_source=github&utm_medium=software_documentation&utm_campaign=schokolade_notfallcheck)

## Wichtiger Sicherheitshinweis

Nach einer unbeabsichtigten Aufnahme von Schokolade sollte sofort eine Tierarztpraxis oder der tierärztliche Notdienst angerufen werden. Nicht auf Symptome warten. Der Rechner ist keine Diagnose, keine Entwarnung und keine Anleitung zur Behandlung.

Ohne ausdrückliche tierärztliche Anweisung:

- kein Erbrechen auslösen;
- keine Milch, kein Öl, kein Salz und keine Humanmedikamente geben;
- keine Behandlung verzögern, um den Rechner auszufüllen.

## Was die Software berechnet

Die Rechenlogik lautet:

```text
geschätzte Menge in g × Literaturwert in mg/g ÷ Körpergewicht in kg
```

Das Ergebnis ist eine Schätzung in Milligramm Methylxanthine pro Kilogramm Körpergewicht. Der konkrete Produktgehalt kann abweichen. Mischprodukte, Pralinen, Kuchen und unbekannte Rezepturen werden bewusst nicht geschätzt.

Verwendete Orientierungswerte:

| Produkt | Wert |
| --- | ---: |
| Weiße Schokolade | 0,04 mg/g |
| Vollmilchschokolade | 2,3 mg/g |
| Süße bis halbsüße dunkle Schokolade | 5,3–5,6 mg/g |
| Ungesüßte Backschokolade | 15,5 mg/g |
| Ungesüßtes Kakaopulver | 28,5 mg/g |
| Tafel mit Prozentangabe | Kakaoanteil × 15,5 mg/g |

## Quellen

- [Merck Veterinary Manual: Chocolate Toxicosis in Animals](https://www.merckvetmanual.com/toxicology/food-hazards/chocolate-toxicosis-in-animals)
- [Cornell Canine Health Center: Chocolate toxicity](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/chocolate-toxicity-what-should-i-do-if-my-dog-eats-chocolate)
- [VCA Animal Hospitals: Chocolate Poisoning in Dogs](https://vcahospitals.com/know-your-pet/chocolate-poisoning-in-dogs)
- [Bundestierärztekammer: Vergiftungen beim Hund](https://www.bundestieraerztekammer.de/presse/archiv/2012/PM30_2012_VergiftungbeimHund.pdf)

Daten- und Quellenstand dieser Version: 28. Juli 2026.

## Datenschutz

Die statische Anwendung:

- setzt keine Cookies;
- lädt keine Werbung, Analyse- oder Drittanbieter-Skripte;
- verwendet weder `fetch` noch `XMLHttpRequest`;
- speichert nichts in `localStorage` oder `sessionStorage`;
- überträgt Gewicht, Menge, Produkt, Kakaoanteil, Zeitpunkt und Ergebnis nicht.

Beim normalen Abruf über GitHub Pages fallen die technisch notwendigen Verbindungsdaten des Hostinganbieters an. Weitere Einzelheiten stehen in [`PRIVACY.md`](PRIVACY.md).

## Zitierhinweis

> Hello Hund Redaktion (2026): Schokolade-Notfallcheck für Hunde, Version 1.1.0. Datenstand 28. Juli 2026.

Maschinenlesbare Angaben stehen in [`CITATION.cff`](CITATION.cff) und [`codemeta.json`](codemeta.json).

## Kostenlos einbetten

Die kompakte Fassung unter [`widget.html`](https://contentkueche.github.io/hello-hund-schokolade-notfallcheck/widget.html) kann in redaktionelle Ratgeber, Praxis- und Vereinsseiten eingebettet werden. Sie ist `noindex`, werbefrei und verwendet dieselbe browserlokale Rechenlogik wie die ausführliche Anwendung.

Der vollständige Einbettcode steht auf der [öffentlichen Projektseite](https://contentkueche.github.io/hello-hund-schokolade-notfallcheck/#einbetten). Er enthält:

- die kompakte Rechenhilfe;
- einen sichtbaren Hinweis auf den sofortigen tierärztlichen Anruf;
- einen sichtbaren Quellenhinweis auf Hello Hund;
- keine Analyse-, Werbe- oder Drittanbieter-Skripte.

Bitte Sicherheits- und Quellenhinweis unverändert übernehmen. Die Einbettung ersetzt keine tierärztliche Beratung.

## Lizenz

Quellcode und Dokumentation stehen unter der MIT-Lizenz. Die verlinkten Fachquellen behalten ihre eigenen rechtlichen Bedingungen.
