(function () {
  "use strict";

  var data = {
    white: { label: "Weiße Schokolade", low: 0.04, high: 0.04 },
    milk: { label: "Vollmilchschokolade", low: 2.3, high: 2.3 },
    dark: { label: "Zartbitter / dunkle Schokolade", low: 5.3, high: 5.6 },
    baking: { label: "Backschokolade / ungesüßte Schokolade", low: 15.5, high: 15.5 },
    powder: { label: "Ungesüßtes Kakaopulver", low: 28.5, high: 28.5 }
  };

  var root = document.querySelector("[data-calculator]");
  if (!root) return;

  var form = root.querySelector("form");
  var weightInput = form.elements.weight;
  var amountInput = form.elements.amount;
  var typeInput = form.elements.type;
  var percentInput = form.elements.percent;
  var timeInput = form.elements.time;
  var percentField = root.querySelector("[data-percent-field]");
  var error = root.querySelector("[data-error]");
  var result = root.querySelector("[data-result]");
  var heading = root.querySelector("[data-result-heading]");
  var dose = root.querySelector("[data-dose]");
  var explanation = root.querySelector("[data-explanation]");
  var summary = root.querySelector("[data-summary]");
  var copyStatus = root.querySelector("[data-copy-status]");

  function parseNumber(value) {
    return Number(String(value || "").replace(",", "."));
  }

  function displayNumber(value, maximumFractionDigits) {
    return new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: maximumFractionDigits
    }).format(value);
  }

  function setPercentVisibility() {
    var visible = typeInput.value === "percent";
    percentField.hidden = !visible;
    percentInput.required = visible;
  }

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
    result.hidden = true;
  }

  function clearError() {
    error.textContent = "";
    error.hidden = true;
  }

  function calculateConcentration(type, percent) {
    if (type === "percent") {
      var concentration = (percent / 100) * 15.5;
      return { low: concentration, high: concentration, label: "Tafel (" + displayNumber(percent, 0) + " % Kakao)" };
    }
    return data[type] || null;
  }

  typeInput.addEventListener("change", setPercentVisibility);
  setPercentVisibility();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearError();

    var weight = parseNumber(weightInput.value);
    var amount = parseNumber(amountInput.value);
    var percent = parseNumber(percentInput.value);
    var type = typeInput.value;

    if (!Number.isFinite(weight) || weight < 0.5 || weight > 120) {
      showError("Bitte trage ein Gewicht zwischen 0,5 und 120 kg ein.");
      return;
    }
    if (!Number.isFinite(amount) || amount < 0.1 || amount > 3000) {
      showError("Bitte trage eine geschätzte Menge zwischen 0,1 und 3.000 g ein.");
      return;
    }
    if (type === "percent" && (!Number.isFinite(percent) || percent < 1 || percent > 100)) {
      showError("Bitte trage einen Kakaoanteil zwischen 1 und 100 Prozent ein.");
      return;
    }

    var productLabel = typeInput.options[typeInput.selectedIndex].textContent;
    var estimateLine;

    if (type === "unknown") {
      heading.textContent = "Keine belastbare Schätzung möglich";
      dose.textContent = "Trotzdem sofort anrufen";
      explanation.textContent = "Für Mischprodukte und unbekannte Rezepturen fehlen belastbare Konzentrationswerte. Verpackung und Zutatenliste für den tierärztlichen Anruf bereithalten.";
      estimateLine = "Schätzung: nicht möglich – unbekanntes oder gemischtes Produkt";
    } else {
      var concentration = calculateConcentration(type, percent);
      productLabel = concentration.label;
      var lowDose = (amount * concentration.low) / weight;
      var highDose = (amount * concentration.high) / weight;
      var doseText = Math.abs(highDose - lowDose) < 0.001
        ? displayNumber(lowDose, 1) + " mg/kg"
        : displayNumber(lowDose, 1) + "–" + displayNumber(highDose, 1) + " mg/kg";
      heading.textContent = "Geschätzte Methylxanthin-Menge";
      dose.textContent = doseText;
      explanation.textContent = "Berechnet aus geschätzter Grammzahl, veröffentlichtem Orientierungswert und Körpergewicht. Der konkrete Produktgehalt kann abweichen.";
      estimateLine = "Geschätzte Methylxanthin-Menge: " + doseText;
    }

    summary.value = [
      "Schokolade beim Hund – Angaben für den tierärztlichen Anruf",
      "Gewicht: " + displayNumber(weight, 1) + " kg",
      "Produkt: " + productLabel,
      "Geschätzte Menge: " + displayNumber(amount, 1) + " g",
      "Zeit seit der Aufnahme: " + timeInput.value,
      estimateLine,
      "Hinweis: Rechenhilfe nach veröffentlichten Merck-Orientierungswerten; Produktwerte können abweichen.",
      "Aktuelle Symptome: ____________________"
    ].join("\n");

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  root.querySelector("[data-copy]").addEventListener("click", function () {
    var value = summary.value;
    function done(message) {
      copyStatus.textContent = message;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () {
        done("Die Notiz wurde kopiert.");
      }).catch(function () {
        summary.focus();
        summary.select();
        done("Die Notiz ist markiert und kann kopiert werden.");
      });
    } else {
      summary.focus();
      summary.select();
      done("Die Notiz ist markiert und kann kopiert werden.");
    }
  });

  root.querySelector("[data-reset]").addEventListener("click", function () {
    form.reset();
    setPercentVisibility();
    clearError();
    result.hidden = true;
    summary.value = "";
    copyStatus.textContent = "";
    weightInput.focus();
  });
})();
