/**
 * QuickCalc Extension Popup Logic
 * Reuses core calculation algorithms from QuickCalc web app.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Tab Elements
  const tabs = {
    bmi: document.getElementById("tab-bmi"),
    loan: document.getElementById("tab-loan"),
    percent: document.getElementById("tab-percent"),
    currency: document.getElementById("tab-currency"),
    tip: document.getElementById("tab-tip"),
  };

  const views = {
    bmi: document.getElementById("view-bmi"),
    loan: document.getElementById("view-loan"),
    percent: document.getElementById("view-percent"),
    currency: document.getElementById("view-currency"),
    tip: document.getElementById("view-tip"),
  };

  function switchTab(targetKey) {
    Object.keys(tabs).forEach((key) => {
      if (key === targetKey) {
        tabs[key].classList.add("active");
        views[key].classList.remove("hidden");
      } else {
        tabs[key].classList.remove("active");
        views[key].classList.add("hidden");
      }
    });
    saveState("activeTab", targetKey);
  }

  Object.keys(tabs).forEach((key) => {
    tabs[key].addEventListener("click", () => switchTab(key));
  });

  // --- 1. BMI CALCULATOR ---
  const bmiUnit = document.getElementById("bmi-unit");
  const bmiWeight = document.getElementById("bmi-weight");
  const bmiHeightCm = document.getElementById("bmi-height-cm");
  const bmiHeightFt = document.getElementById("bmi-height-ft");
  const bmiHeightIn = document.getElementById("bmi-height-in");
  const bmiMetricBox = document.getElementById("bmi-metric-height");
  const bmiImperialBox = document.getElementById("bmi-imperial-height");
  const bmiVal = document.getElementById("bmi-val");
  const bmiCat = document.getElementById("bmi-cat");

  function calcBMI() {
    const isMetric = bmiUnit.value === "metric";
    const w = parseFloat(bmiWeight.value) || 0;

    let heightM = 0;
    if (isMetric) {
      const cm = parseFloat(bmiHeightCm.value) || 0;
      heightM = cm / 100;
    } else {
      const ft = parseFloat(bmiHeightFt.value) || 0;
      const inches = parseFloat(bmiHeightIn.value) || 0;
      const totalInches = ft * 12 + inches;
      heightM = totalInches * 0.0254;
      // Convert weight lb to kg if imperial
      // w is passed in lb
    }

    const weightKg = isMetric ? w : w * 0.45359237;

    if (weightKg > 0 && heightM > 0) {
      const bmi = weightKg / (heightM * heightM);
      const rounded = parseFloat(bmi.toFixed(1));
      bmiVal.textContent = rounded;

      let category = "Normal Weight";
      let catColor = "text-teal-300";
      if (rounded < 18.5) {
        category = "Underweight";
        catColor = "text-sky-300";
      } else if (rounded >= 25 && rounded < 29.9) {
        category = "Overweight";
        catColor = "text-amber-300";
      } else if (rounded >= 30) {
        category = "Obesity";
        catColor = "text-rose-300";
      }
      bmiCat.textContent = category;
      bmiCat.className = `text-xs font-bold ${catColor}`;
    } else {
      bmiVal.textContent = "--";
      bmiCat.textContent = "Enter valid height and weight";
    }
  }

  bmiUnit.addEventListener("change", () => {
    if (bmiUnit.value === "metric") {
      bmiMetricBox.classList.remove("hidden");
      bmiImperialBox.classList.add("hidden");
    } else {
      bmiMetricBox.classList.add("hidden");
      bmiImperialBox.classList.remove("hidden");
    }
    calcBMI();
  });

  [bmiWeight, bmiHeightCm, bmiHeightFt, bmiHeightIn].forEach((el) => {
    el.addEventListener("input", calcBMI);
  });

  // --- 2. LOAN CALCULATOR ---
  const loanPrincipal = document.getElementById("loan-principal");
  const loanRate = document.getElementById("loan-rate");
  const loanTenure = document.getElementById("loan-tenure");
  const loanEmi = document.getElementById("loan-emi");
  const loanInterest = document.getElementById("loan-interest");

  function calcLoan() {
    const P = parseFloat(loanPrincipal.value) || 0;
    const rate = parseFloat(loanRate.value) || 0;
    const years = parseFloat(loanTenure.value) || 0;

    if (P > 0 && years > 0) {
      const N = years * 12;
      const R = rate / 12 / 100;

      let emi = 0;
      if (R === 0) {
        emi = P / N;
      } else {
        emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      }

      const totalPayment = emi * N;
      const totalInterest = totalPayment - P;

      loanEmi.textContent = `$${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      loanInterest.textContent = `$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      loanEmi.textContent = "--";
      loanInterest.textContent = "--";
    }
  }

  [loanPrincipal, loanRate, loanTenure].forEach((el) => el.addEventListener("input", calcLoan));

  // --- 3. PERCENTAGE CHANGE CALCULATOR ---
  const pctV1 = document.getElementById("pct-v1");
  const pctV2 = document.getElementById("pct-v2");
  const pctRes = document.getElementById("pct-res");
  const pctDir = document.getElementById("pct-dir");

  function calcPercent() {
    const v1 = parseFloat(pctV1.value);
    const v2 = parseFloat(pctV2.value);

    if (!isNaN(v1) && !isNaN(v2)) {
      const diff = v2 - v1;
      const pct = v1 !== 0 ? (diff / v1) * 100 : 0;
      const sign = pct > 0 ? "+" : "";
      pctRes.textContent = `${sign}${pct.toFixed(1)}%`;

      if (pct > 0) {
        pctDir.textContent = "Increase";
        pctDir.className = "text-xs font-bold text-amber-300";
      } else if (pct < 0) {
        pctDir.textContent = "Decrease";
        pctDir.className = "text-xs font-bold text-rose-300";
      } else {
        pctDir.textContent = "No Change";
        pctDir.className = "text-xs font-bold text-zinc-400";
      }
    } else {
      pctRes.textContent = "--";
      pctDir.textContent = "";
    }
  }

  [pctV1, pctV2].forEach((el) => el.addEventListener("input", calcPercent));

  // --- 4. CURRENCY CONVERTER ---
  const currAmount = document.getElementById("curr-amount");
  const currFrom = document.getElementById("curr-from");
  const currTo = document.getElementById("curr-to");
  const currResult = document.getElementById("curr-result");
  const currRate = document.getElementById("curr-rate");

  const RATES_TO_USD = {
    USD: 1.0,
    EUR: 1.09,
    GBP: 1.27,
    CAD: 0.74,
    AUD: 0.66,
    JPY: 0.0068,
    INR: 0.012,
  };

  const SYMBOLS = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "$",
    AUD: "$",
    JPY: "¥",
    INR: "₹",
  };

  function calcCurrency() {
    const amt = parseFloat(currAmount.value) || 0;
    const from = currFrom.value;
    const to = currTo.value;

    const fromRate = RATES_TO_USD[from] || 1;
    const toRate = RATES_TO_USD[to] || 1;

    const rate = fromRate / toRate;
    const converted = amt * rate;

    const sym = SYMBOLS[to] || "";
    currResult.textContent = `${sym}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    currRate.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  }

  [currAmount, currFrom, currTo].forEach((el) => {
    el.addEventListener("input", calcCurrency);
    el.addEventListener("change", calcCurrency);
  });

  // --- 5. TIP SPLITTER ---
  const tipBill = document.getElementById("tip-bill");
  const tipPct = document.getElementById("tip-pct");
  const tipPeople = document.getElementById("tip-people");
  const tipPerPerson = document.getElementById("tip-per-person");
  const tipTotal = document.getElementById("tip-total");

  function calcTip() {
    const bill = parseFloat(tipBill.value) || 0;
    const pct = parseFloat(tipPct.value) || 0;
    const people = parseInt(tipPeople.value, 10) || 1;

    if (bill > 0 && people >= 1) {
      const tipAmount = bill * (pct / 100);
      const total = bill + tipAmount;
      const perPerson = total / people;

      tipPerPerson.textContent = `$${perPerson.toFixed(2)}`;
      tipTotal.textContent = `Grand Total: $${total.toFixed(2)} (Tip: $${tipAmount.toFixed(2)})`;
    } else {
      tipPerPerson.textContent = "--";
      tipTotal.textContent = "";
    }
  }

  [tipBill, tipPct, tipPeople].forEach((el) => el.addEventListener("input", calcTip));

  // --- STATE PERSISTENCE ---
  function saveState(key, val) {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ [key]: val });
    }
  }

  function loadState() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["activeTab"], (result) => {
        if (result && result.activeTab) {
          switchTab(result.activeTab);
        }
      });
    }
  }

  // Initial Calculation Run
  calcBMI();
  calcLoan();
  calcPercent();
  calcCurrency();
  calcTip();
  loadState();
});
