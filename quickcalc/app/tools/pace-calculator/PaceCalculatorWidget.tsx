"use client";

import { useState, useEffect, useMemo } from "react";
import { formatSecondsToTime, formatPace, timeToSeconds, getPaceExplanationSteps } from "../../../lib/calculators/paceCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";

type Mode = "pace" | "time" | "distance";

export default function PaceCalculatorWidget() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("pace");

  // General inputs
  const [distance, setDistance] = useState<string>("10");
  const [distanceUnit, setDistanceUnit] = useState<"km" | "mi">("km");

  // Time Inputs (Hours, Minutes, Seconds)
  const [hours, setHours] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("50");
  const [seconds, setSeconds] = useState<string>("00");

  // Pace Inputs
  const [paceMin, setPaceMin] = useState<string>("5");
  const [paceSec, setPaceSec] = useState<string>("00");
  const [paceUnit, setPaceUnit] = useState<"km" | "mi">("km");

  // Live calculated state
  const [calculatedPaceKm, setCalculatedPaceKm] = useState<string>("");
  const [calculatedPaceMile, setCalculatedPaceMile] = useState<string>("");
  const [calculatedTime, setCalculatedTime] = useState<string>("");
  const [calculatedDistanceKm, setCalculatedDistanceKm] = useState<string>("");
  const [calculatedDistanceMile, setCalculatedDistanceMile] = useState<string>("");
  const [speedKph, setSpeedKph] = useState<string>("");
  const [speedMph, setSpeedMph] = useState<string>("");

  const [copied, setCopied] = useState(false);

  // Parse helper safely
  const parseNum = (val: string) => {
    const p = parseFloat(val);
    return isNaN(p) || p < 0 ? 0 : p;
  };

  useEffect(() => {
    const distNum = parseFloat(distance);
    const h = parseNum(hours);
    const m = parseNum(minutes);
    const s = parseNum(seconds);
    const totalSec = timeToSeconds(h, m, s);
    const pMin = parseInt(paceMin, 10) || 0;
    const pSec = parseInt(paceSec, 10) || 0;
    const paceTotalSeconds = (pMin * 60) + pSec;

    if (mode === "pace") {
      // Find Pace
      if (!distNum || distNum <= 0 || totalSec <= 0) {
        setCalculatedPaceKm("");
        setCalculatedPaceMile("");
        setSpeedKph("");
        setSpeedMph("");
        return;
      }

      // convert to km first to normalize
      const distanceInKm = distanceUnit === "km" ? distNum : distNum * 1.609344;
      const distanceInMiles = distanceUnit === "mi" ? distNum : distNum / 1.609344;

      const secPerKm = totalSec / distanceInKm;
      const secPerMile = totalSec / distanceInMiles;

      setCalculatedPaceKm(formatPace(secPerKm));
      setCalculatedPaceMile(formatPace(secPerMile));

      const kph = (distanceInKm / totalSec) * 3600;
      const mph = (distanceInMiles / totalSec) * 3600;

      setSpeedKph(kph.toFixed(2));
      setSpeedMph(mph.toFixed(2));

    } else if (mode === "time") {
      // Find Time
      if (!distNum || distNum <= 0 || paceTotalSeconds <= 0) {
        setCalculatedTime("");
        setSpeedKph("");
        setSpeedMph("");
        return;
      }

      // paceTotalSeconds is seconds per paceUnit (km or mi)
      let totalTimeSeconds = 0;
      let kph = 0;
      let mph = 0;

      if (paceUnit === "km") {
        if (distanceUnit === "km") {
          totalTimeSeconds = paceTotalSeconds * distNum;
        } else {
          totalTimeSeconds = paceTotalSeconds * (distNum * 1.609344);
        }
        kph = 3600 / paceTotalSeconds;
        mph = kph / 1.609344;
      } else {
        if (distanceUnit === "mi") {
          totalTimeSeconds = paceTotalSeconds * distNum;
        } else {
          totalTimeSeconds = paceTotalSeconds * (distNum / 1.609344);
        }
        mph = 3600 / paceTotalSeconds;
        kph = mph * 1.609344;
      }

      setCalculatedTime(formatSecondsToTime(totalTimeSeconds));
      setSpeedKph(kph.toFixed(2));
      setSpeedMph(mph.toFixed(2));

    } else if (mode === "distance") {
      // Find Distance
      if (totalSec <= 0 || paceTotalSeconds <= 0) {
        setCalculatedDistanceKm("");
        setCalculatedDistanceMile("");
        setSpeedKph("");
        setSpeedMph("");
        return;
      }

      let km = 0;
      let miles = 0;
      let kph = 0;
      let mph = 0;

      if (paceUnit === "km") {
        km = totalSec / paceTotalSeconds;
        miles = km / 1.609344;
        kph = 3600 / paceTotalSeconds;
        mph = kph / 1.609344;
      } else {
        miles = totalSec / paceTotalSeconds;
        km = miles * 1.609344;
        mph = 3600 / paceTotalSeconds;
        kph = mph * 1.609344;
      }

      setCalculatedDistanceKm(km.toFixed(2));
      setCalculatedDistanceMile(miles.toFixed(2));
      setSpeedKph(kph.toFixed(2));
      setSpeedMph(mph.toFixed(2));
    }
  }, [mode, distance, distanceUnit, hours, minutes, seconds, paceMin, paceSec, paceUnit]);

  const explanationSteps = useMemo(() => {
    const distNum = parseFloat(distance) || 0;
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;
    const totalSec = timeToSeconds(h, m, s);

    if (distNum <= 0 || totalSec <= 0) return [];

    return getPaceExplanationSteps(distNum, distanceUnit, totalSec, {
      pacePerKm: calculatedPaceKm || "--:--",
      pacePerMile: calculatedPaceMile || "--:--",
      speedKph: speedKph || "0.00",
      speedMph: speedMph || "0.00",
    });
  }, [distance, distanceUnit, hours, minutes, seconds, calculatedPaceKm, calculatedPaceMile, speedKph, speedMph]);

  // Race Time Predictions logic
  // Returns prediction times for 5k, 10k, Half, Full marathon based on the active or calculated pace
  const getPredictorTimes = () => {
    let secPerKm = 0;

    const distNum = parseFloat(distance);
    const h = parseNum(hours);
    const m = parseNum(minutes);
    const s = parseNum(seconds);
    const totalSec = timeToSeconds(h, m, s);
    const pMin = parseInt(paceMin, 10) || 0;
    const pSec = parseInt(paceSec, 10) || 0;
    const paceTotalSeconds = (pMin * 60) + pSec;

    if (mode === "pace") {
      if (!distNum || distNum <= 0 || totalSec <= 0) return null;
      const distanceInKm = distanceUnit === "km" ? distNum : distNum * 1.609344;
      secPerKm = totalSec / distanceInKm;
    } else if (mode === "time") {
      if (!distNum || distNum <= 0 || paceTotalSeconds <= 0) return null;
      secPerKm = paceUnit === "km" ? paceTotalSeconds : paceTotalSeconds / 1.609344;
    } else if (mode === "distance") {
      if (totalSec <= 0 || paceTotalSeconds <= 0) return null;
      secPerKm = paceUnit === "km" ? paceTotalSeconds : paceTotalSeconds / 1.609344;
    }

    if (secPerKm <= 0 || !isFinite(secPerKm)) return null;

    const formatPrediction = (km: number) => {
      return formatSecondsToTime(secPerKm * km);
    };

    return {
      "5K": formatPrediction(5),
      "10K": formatPrediction(10),
      "Half Marathon": formatPrediction(21.0975), // standard half marathon is 21.0975km
      "Marathon": formatPrediction(42.195),     // standard full marathon is 42.195km
    };
  };

  const predictions = getPredictorTimes();

  // Copy to clipboard function
  const handleCopy = () => {
    let text = `Running Pace Calculator Results:\n\n`;

    if (mode === "pace") {
      text += `Input: Distance = ${distance} ${distanceUnit.toUpperCase()}, Time = ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}\n`;
      text += `Calculated Pace:\n`;
      text += `- Pace per KM: ${calculatedPaceKm || "--:--"} min/km\n`;
      text += `- Pace per Mile: ${calculatedPaceMile || "--:--"} min/mile\n`;
      text += `- Speed: ${speedKph || "--"} km/h (${speedMph || "--"} mph)\n`;
    } else if (mode === "time") {
      text += `Input: Pace = ${paceMin}:${paceSec} min/${paceUnit}, Distance = ${distance} ${distanceUnit.toUpperCase()}\n`;
      text += `Calculated Time:\n`;
      text += `- Total Time: ${calculatedTime || "--:--:--"}\n`;
      text += `- Speed: ${speedKph || "--"} km/h (${speedMph || "--"} mph)\n`;
    } else {
      text += `Input: Pace = ${paceMin}:${paceSec} min/${paceUnit}, Time = ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}\n`;
      text += `Calculated Distance:\n`;
      text += `- Total Distance: ${calculatedDistanceKm || "--"} km (${calculatedDistanceMile || "--"} miles)\n`;
      text += `- Speed: ${speedKph || "--"} km/h (${speedMph || "--"} mph)\n`;
    }

    if (predictions) {
      text += `\nRace Finish Time Predictions (at same pace):\n`;
      text += `- 5K: ${predictions["5K"]}\n`;
      text += `- 10K: ${predictions["10K"]}\n`;
      text += `- Half Marathon (21.1 km): ${predictions["Half Marathon"]}\n`;
      text += `- Full Marathon (42.2 km): ${predictions["Marathon"]}\n`;
    }

    text += `\nCalculate yours at https://quickcalc.cloud/tools/pace-calculator`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = () => {
    generatePdf({
      toolName: "Running Pace Calculator",
      toolSlug: "pace-calculator",
      inputs: [
        { label: "Calculation Mode", value: mode.toUpperCase() },
        { label: "Distance", value: `${distance} ${distanceUnit}` },
        { label: "Target Time", value: `${hours}h ${minutes}m ${seconds}s` },
      ],
      results: [
        { label: "Pace per Kilometer", value: calculatedPaceKm ? `${calculatedPaceKm} /km` : "--", isHighlight: true },
        { label: "Pace per Mile", value: calculatedPaceMile ? `${calculatedPaceMile} /mi` : "--" },
        { label: "Speed (km/h)", value: `${speedKph || "--"} km/h` },
        { label: "Speed (mph)", value: `${speedMph || "--"} mph` },
      ],
      summaryNote: `Pace breakdown and race predictions based on your target performance.`,
      table: predictions ? {
        title: "Race Time Predictions",
        headers: ["Race Event", "Distance", "Estimated Finish Time"],
        rows: [
          ["5K", "5 km (3.1 mi)", predictions["5K"]],
          ["10K", "10 km (6.2 mi)", predictions["10K"]],
          ["Half Marathon", "21.1 km (13.1 mi)", predictions["Half Marathon"]],
          ["Full Marathon", "42.2 km (26.2 mi)", predictions["Marathon"]],
        ],
      } : undefined,
      filename: `Running-Pace-Report.pdf`,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
        <h3 className="text-2xl font-bold">3-in-1 Running Pace Calculator</h3>
        <p className="text-xs text-blue-100 mt-1">
          Calculate Pace, Time, or Distance simultaneously & view instant race predictions
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        {(["pace", "time", "distance"] as Mode[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all capitalize ${
              mode === tab
                ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-zinc-50/50 dark:bg-zinc-900/50"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {tab === "pace" ? "Find My Pace" : tab === "time" ? "Find My Time" : "Find My Distance"}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Dynamic Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Distance Input - Shown in "pace" and "time" modes */}
          {mode !== "distance" && (
            <div>
              <label htmlFor="distance" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Distance
              </label>
              <div className="flex rounded-lg shadow-sm">
                <input
                  id="distance"
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="e.g. 10"
                  step="any"
                  min="0"
                />
                <button
                  type="button"
                  onClick={() => setDistanceUnit("km")}
                  className={`px-4 py-3 border-y border-zinc-300 dark:border-zinc-700 font-medium text-sm transition-colors ${
                    distanceUnit === "km"
                      ? "bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                  }`}
                >
                  km
                </button>
                <button
                  type="button"
                  onClick={() => setDistanceUnit("mi")}
                  className={`px-4 py-3 border-r border-y rounded-r-lg border-zinc-300 dark:border-zinc-700 font-medium text-sm transition-colors ${
                    distanceUnit === "mi"
                      ? "bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                  }`}
                >
                  mile
                </button>
              </div>
            </div>
          )}

          {/* Time Input - Shown in "pace" and "distance" modes */}
          {mode !== "time" && (
            <div className={mode === "distance" ? "sm:col-span-2" : ""}>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Time (HH : MM : SS)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="block w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="hr"
                    min="0"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] text-zinc-400">hr</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="block w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="min"
                    min="0"
                    max="59"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] text-zinc-400">min</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="block w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="sec"
                    min="0"
                    max="59"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] text-zinc-400">sec</span>
                </div>
              </div>
            </div>
          )}

          {/* Pace Input - Shown in "time" and "distance" modes */}
          {mode !== "pace" && (
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Pace (MM : SS)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={paceMin}
                    onChange={(e) => setPaceMin(e.target.value)}
                    className="block w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="min"
                    min="0"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] text-zinc-400">min</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={paceSec}
                    onChange={(e) => setPaceSec(e.target.value)}
                    className="block w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="sec"
                    min="0"
                    max="59"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] text-zinc-400">sec</span>
                </div>
                <div className="flex rounded-lg shadow-sm border border-zinc-300 dark:border-zinc-700 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setPaceUnit("km")}
                    className={`px-3 py-2 font-medium text-xs transition-colors ${
                      paceUnit === "km"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    /km
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaceUnit("mi")}
                    className={`px-3 py-2 font-medium text-xs transition-colors border-l border-zinc-300 dark:border-zinc-700 ${
                      paceUnit === "mi"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    /mi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Result Output Panel */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 p-6 rounded-2xl">
          <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-center mb-4">
            Live Calculation Result
          </h4>

          {mode === "pace" && (
            <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-200 dark:divide-zinc-800 text-center">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {calculatedPaceKm ? `${calculatedPaceKm}` : "--:--"}
                </span>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                  min / km
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {calculatedPaceMile ? `${calculatedPaceMile}` : "--:--"}
                </span>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                  min / mile
                </span>
              </div>
            </div>
          )}

          {mode === "time" && (
            <div className="text-center">
              <span className="text-3xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                {calculatedTime ? calculatedTime : "--:--:--"}
              </span>
              <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                Estimated Finish Time
              </span>
            </div>
          )}

          {mode === "distance" && (
            <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-200 dark:divide-zinc-800 text-center">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {calculatedDistanceKm ? `${calculatedDistanceKm} km` : "-- km"}
                </span>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                  Total Distance
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {calculatedDistanceMile ? `${calculatedDistanceMile} mi` : "-- mi"}
                </span>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                  Total Distance
                </span>
              </div>
            </div>
          )}

          {/* Speed & Copy Button footer */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
              Speed: <span className="font-bold text-zinc-700 dark:text-zinc-300">{speedKph || "--"} km/h</span> ({speedMph || "--"} mph)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                {copied ? "✓ Copied!" : "📋 Copy Results"}
              </button>
              <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
                <DownloadPdfButton onClick={handleDownloadPdf} />
            </div>
          </div>
        </div>

        {/* Race Time Predictor Table */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50">
          <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Race Time Predictor Table
            </h4>
            <span className="text-[10px] text-zinc-500 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full font-semibold">
              Live estimate
            </span>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[
              { name: "5K", dist: "5 km (3.1 mi)", time: predictions ? predictions["5K"] : "--:--" },
              { name: "10K", dist: "10 km (6.2 mi)", time: predictions ? predictions["10K"] : "--:--" },
              { name: "Half Marathon", dist: "21.1 km (13.1 mi)", time: predictions ? predictions["Half Marathon"] : "--:--" },
              { name: "Full Marathon", dist: "42.2 km (26.2 mi)", time: predictions ? predictions["Marathon"] : "--:--" },
            ].map((race) => (
              <div key={race.name} className="px-4 py-3 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">
                    {race.name}
                  </span>
                  <span className="block text-[11px] text-zinc-400">
                    {race.dist}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-base sm:text-lg">
                    {race.time}
                  </span>
                  <span className="block text-[10px] text-zinc-400">
                    est. finish
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Explanation Accordion */}
        <ExplainResultAccordion steps={explanationSteps} />
      </div>
    
      {/* Share Result Modal */}
      {calculatedPaceKm !== "" && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "Running Pace Calculator",
            toolSlug: "pace-calculator",
            category: "Health & Fitness",
            resultValue: `${calculatedPaceKm} / km (${calculatedPaceMile} / mi)`,
            resultLabel: `Speed: ${speedKph} km/h (${speedMph} mph)`,
            inputsSummary: [{ label: 'Distance', value: `${distance} ${distanceUnit}` }, { label: 'Time', value: `${hours}h ${minutes}m ${seconds}s` }],
          }}
        />
      )}
</div>
  );
}
