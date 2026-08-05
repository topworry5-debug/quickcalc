
"use client";

import { useState, useEffect } from "react";
import {
  DistanceUnit,
  TimeUnit,
  SpeedUnit,
  calculateSDT,
  calculateFlightDuration,
  calculateFuelCost,
} from "@/lib/calculators/travelCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";

type ActiveTab = "sdt" | "flight" | "fuel";

export default function TravelTimeFuelWidget() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("sdt");

  // --- Speed, Distance, Time State ---
  const [sdtType, setSdtType] = useState<"time" | "distance" | "speed">("time");
  const [distance, setDistance] = useState<string>("100");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [speed, setSpeed] = useState<string>("50");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("km/h");
  const [time, setTime] = useState<string>("2");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("hours");
  const [sdtResult, setSdtResult] = useState<{ formatted: string; value: number; explanation: string } | null>(null);

  // --- Flight Time State ---
  const [flightDistance, setFlightDistance] = useState<string>("5000");
  const [flightDistanceUnit, setFlightDistanceUnit] = useState<DistanceUnit>("km");
  const [flightSpeed, setFlightSpeed] = useState<string>("850");
  const [flightSpeedUnit, setFlightSpeedUnit] = useState<SpeedUnit>("km/h");
  const [flightResult, setFlightResult] = useState<{ durationSeconds: number; formatted: string } | null>(null);

  // --- Fuel Cost State ---
  const [fuelDistance, setFuelDistance] = useState<string>("300");
  const [fuelDistanceUnit, setFuelDistanceUnit] = useState<"km" | "miles">("km");
  const [efficiency, setEfficiency] = useState<string>("15");
  const [efficiencyUnit, setEfficiencyUnit] = useState<"km/l" | "mpg_us" | "mpg_uk" | "l/100km">("km/l");
  const [fuelPrice, setFuelPrice] = useState<string>("1.50");
  const [priceUnit, setPriceUnit] = useState<"per_litre" | "per_gal_us" | "per_gal_uk">("per_litre");
  const [fuelResult, setFuelResult] = useState<{
    totalFuelLiters: number;
    totalFuelGallonsUs: number;
    totalFuelGallonsUk: number;
    totalCost: number;
    efficiencyL100km: number;
  } | null>(null);

  // --- Real-time Calculations ---
  useEffect(() => {
    if (activeTab === "sdt") {
      const dVal = parseFloat(distance);
      const sVal = parseFloat(speed);
      const tVal = parseFloat(time);

      const res = calculateSDT({
        calculateType: sdtType,
        distance: dVal,
        distanceUnit,
        speed: sVal,
        speedUnit,
        time: tVal,
        timeUnit,
      });
      setSdtResult(res);
    }
  }, [activeTab, sdtType, distance, distanceUnit, speed, speedUnit, time, timeUnit]);

  useEffect(() => {
    if (activeTab === "flight") {
      const dVal = parseFloat(flightDistance);
      const sVal = parseFloat(flightSpeed);
      const res = calculateFlightDuration(dVal, flightDistanceUnit, sVal, flightSpeedUnit);
      setFlightResult(res);
    }
  }, [activeTab, flightDistance, flightDistanceUnit, flightSpeed, flightSpeedUnit]);

  useEffect(() => {
    if (activeTab === "fuel") {
      const dVal = parseFloat(fuelDistance);
      const effVal = parseFloat(efficiency);
      const priceVal = parseFloat(fuelPrice);

      const res = calculateFuelCost({
        distance: dVal,
        distanceUnit: fuelDistanceUnit,
        efficiency: effVal,
        efficiencyUnit,
        fuelPrice: priceVal,
        priceUnit,
      });
      setFuelResult(res);
    }
  }, [activeTab, fuelDistance, fuelDistanceUnit, efficiency, efficiencyUnit, fuelPrice, priceUnit]);

  const handleReset = () => {
    if (activeTab === "sdt") {
      setSdtType("time");
      setDistance("100");
      setDistanceUnit("km");
      setSpeed("50");
      setSpeedUnit("km/h");
      setTime("2");
      setTimeUnit("hours");
    } else if (activeTab === "flight") {
      setFlightDistance("5000");
      setFlightDistanceUnit("km");
      setFlightSpeed("850");
      setFlightSpeedUnit("km/h");
    } else {
      setFuelDistance("300");
      setFuelDistanceUnit("km");
      setEfficiency("15");
      setEfficiencyUnit("km/l");
      setFuelPrice("1.50");
      setPriceUnit("per_litre");
    }
  };

  const handleDownloadPdf = () => {
    if (activeTab === "sdt" && sdtResult) {
      generatePdf({
        toolName: "Speed Distance Time Calculator",
        toolSlug: "travel-time-fuel-calculator",
        inputs: [
          { label: "Calculation Target", value: sdtType.toUpperCase() },
        ],
        results: [
          { label: "Calculated Result", value: sdtResult.formatted, isHighlight: true },
        ],
        summaryNote: `Physics travel calculation using standard speed-distance-time formulas.`,
        filename: `Travel-SDT-Report.pdf`,
      });
    } else if (activeTab === "flight" && flightResult) {
      generatePdf({
        toolName: "Flight Duration Calculator",
        toolSlug: "travel-time-fuel-calculator",
        inputs: [
          { label: "Flight Distance", value: `${flightDistance} ${flightDistanceUnit}` },
          { label: "Cruising Speed", value: `${flightSpeed} ${flightSpeedUnit}` },
        ],
        results: [
          { label: "Estimated Flight Duration", value: flightResult.formatted, isHighlight: true },
        ],
        summaryNote: `Flight time estimation based on distance and average cruise speed.`,
        filename: `Flight-Duration-Report.pdf`,
      });
    } else if (activeTab === "fuel" && fuelResult) {
      generatePdf({
        toolName: "Fuel Cost Calculator",
        toolSlug: "travel-time-fuel-calculator",
        inputs: [
          { label: "Trip Distance", value: `${fuelDistance} ${fuelDistanceUnit}` },
          { label: "Fuel Price", value: `$${fuelPrice} (${priceUnit})` },
        ],
        results: [
          { label: "Estimated Fuel Cost", value: `$${fuelResult.totalCost.toFixed(2)}`, isHighlight: true },
          { label: "Fuel Needed (Liters)", value: `${fuelResult.totalFuelLiters} L` },
          { label: "Fuel Needed (US Gallons)", value: `${fuelResult.totalFuelGallonsUs} gal` },
        ],
        summaryNote: `Trip fuel cost and consumption estimation based on vehicle efficiency.`,
        filename: `Fuel-Cost-Report.pdf`,
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-6 text-white text-center">
        <h3 className="text-2xl font-bold">✈️ Travel Time & Fuel Cost Calculator</h3>
        <p className="text-xs text-blue-50 mt-1.5 max-w-lg mx-auto">
          Instantly calculate travel times, flight durations, speeds, distances, and vehicle fuel costs.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <button
          onClick={() => setActiveTab("sdt")}
          className={`flex-1 py-3 px-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 text-center ${
            activeTab === "sdt"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
          }`}
        >
          ⏱️ Speed, Distance, Time
        </button>
        <button
          onClick={() => setActiveTab("flight")}
          className={`flex-1 py-3 px-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 text-center ${
            activeTab === "flight"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
          }`}
        >
          ✈️ Flight Duration
        </button>
        <button
          onClick={() => setActiveTab("fuel")}
          className={`flex-1 py-3 px-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 text-center ${
            activeTab === "fuel"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
          }`}
        >
          ⛽ Fuel Cost Estimator
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* --- TABS CONTENT --- */}

        {/* 1. SDT Reverse Calculator */}
        {activeTab === "sdt" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                What do you want to calculate?
              </label>
              <select
                value={sdtType}
                onChange={(e) => setSdtType(e.target.value as "time" | "distance" | "speed")}
                className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="time">⏱️ Travel Time (given Distance & Speed)</option>
                <option value="distance">🗺️ Travel Distance (given Speed & Time)</option>
                <option value="speed">⚡ Average Speed (given Distance & Time)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Distance Input */}
              {sdtType !== "distance" && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                    Distance
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder="e.g. 100"
                      className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <select
                      value={distanceUnit}
                      onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
                      className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="km">km</option>
                      <option value="miles">mi</option>
                      <option value="meters">m</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Speed Input */}
              {sdtType !== "speed" && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                    Speed
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value)}
                      placeholder="e.g. 80"
                      className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <select
                      value={speedUnit}
                      onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                      className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="km/h">km/h</option>
                      <option value="mph">mph</option>
                      <option value="m/s">m/s</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Time Input */}
              {sdtType !== "time" && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                    Time
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 2"
                      className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <select
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                      className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="hours">hours</option>
                      <option value="minutes">minutes</option>
                      <option value="seconds">seconds</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* SDT Result Card */}
            {sdtResult ? (
              <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950/40 dark:to-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-6 rounded-2xl text-center shadow-inner mt-6 animate-fadeIn">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                  Calculated Result
                </span>
                <p className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                  {sdtResult.formatted}
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-medium text-zinc-500 dark:text-zinc-400 font-mono whitespace-pre-line">
                  {sdtResult.explanation}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-200 text-sm text-center font-medium">
                ⚠️ Please provide positive, valid inputs to calculate.
              </div>
            )}
          </div>
        )}

        {/* 2. Flight Duration Estimator */}
        {activeTab === "flight" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Flight Distance
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={flightDistance}
                    onChange={(e) => setFlightDistance(e.target.value)}
                    placeholder="e.g. 5000"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <select
                    value={flightDistanceUnit}
                    onChange={(e) => setFlightDistanceUnit(e.target.value as DistanceUnit)}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="km">km</option>
                    <option value="miles">mi</option>
                    <option value="meters">m</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Cruising Speed
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={flightSpeed}
                    onChange={(e) => setFlightSpeed(e.target.value)}
                    placeholder="e.g. 850"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <select
                    value={flightSpeedUnit}
                    onChange={(e) => setFlightSpeedUnit(e.target.value as SpeedUnit)}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="km/h">km/h</option>
                    <option value="mph">mph</option>
                    <option value="m/s">m/s</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Flight Preset Speed Quick Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 self-center">Typical speeds:</span>
              <button
                type="button"
                onClick={() => {
                  setFlightSpeed("850");
                  setFlightSpeedUnit("km/h");
                }}
                className="px-2.5 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                Commercial Jet (850 km/h)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFlightSpeed("350");
                  setFlightSpeedUnit("km/h");
                }}
                className="px-2.5 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                Turboprop (350 km/h)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFlightSpeed("250");
                  setFlightSpeedUnit("km/h");
                }}
                className="px-2.5 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                Light Aircraft (250 km/h)
              </button>
            </div>

            {/* Flight Result Card */}
            {flightResult ? (
              <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950/40 dark:to-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-6 rounded-2xl text-center shadow-inner mt-6 animate-fadeIn">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                  Estimated Cruising Flight Duration
                </span>
                <p className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                  {flightResult.formatted}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  *Excludes takeoff, taxiing, holding patterns, and airport congestion buffers.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-200 text-sm text-center font-medium">
                ⚠️ Please enter a positive flight distance and cruising speed.
              </div>
            )}
          </div>
        )}

        {/* 3. Fuel Cost Estimator */}
        {activeTab === "fuel" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Trip Distance */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Trip Distance
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={fuelDistance}
                    onChange={(e) => setFuelDistance(e.target.value)}
                    placeholder="e.g. 300"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <select
                    value={fuelDistanceUnit}
                    onChange={(e) => setFuelDistanceUnit(e.target.value as "km" | "miles")}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none text-sm"
                  >
                    <option value="km">km</option>
                    <option value="miles">mi</option>
                  </select>
                </div>
              </div>

              {/* Fuel Efficiency */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Efficiency
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                    placeholder="e.g. 15"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <select
                    value={efficiencyUnit}
                    onChange={(e) => setEfficiencyUnit(e.target.value as "km/l" | "mpg_us" | "mpg_uk" | "l/100km")}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none text-sm"
                  >
                    <option value="km/l">km/L</option>
                    <option value="mpg_us">mpg (US)</option>
                    <option value="mpg_uk">mpg (UK)</option>
                    <option value="l/100km">L/100km</option>
                  </select>
                </div>
              </div>

              {/* Fuel Price */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Fuel Price
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={fuelPrice}
                    step="0.01"
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="e.g. 1.50"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <select
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value as "per_litre" | "per_gal_us" | "per_gal_uk")}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 focus:border-blue-500 focus:outline-none text-sm"
                  >
                    <option value="per_litre">/ liter</option>
                    <option value="per_gal_us">/ gal (US)</option>
                    <option value="per_gal_uk">/ gal (UK)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fuel Result Card */}
            {fuelResult ? (
              <div className="space-y-4 mt-6 animate-fadeIn">
                <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950/40 dark:to-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-6 rounded-2xl text-center shadow-inner">
                  <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                    Estimated Total Fuel Cost
                  </span>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                    ${fuelResult.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">Fuel Needed</span>
                    <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200">{fuelResult.totalFuelLiters} L</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">US Gallons</span>
                    <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200">{fuelResult.totalFuelGallonsUs} gal</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">UK Gallons</span>
                    <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200">{fuelResult.totalFuelGallonsUk} gal</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">Normalized</span>
                    <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200">{fuelResult.efficiencyL100km} L/100km</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-200 text-sm text-center font-medium">
                ⚠️ Please provide valid positive trip metrics (distance, efficiency, and price).
              </div>
            )}
          </div>
        )}

        {/* Global Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <DownloadPdfButton onClick={handleDownloadPdf} className="py-2.5" />
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl text-sm transition-colors shadow-sm"
          >
            Reset Fields
          </button>
        </div>
      </div>
    </div>
  );
}
