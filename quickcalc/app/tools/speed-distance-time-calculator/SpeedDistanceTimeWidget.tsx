"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import {
  calculateCoreSDT,
  DistanceUnit,
  TimeUnit,
  SpeedUnit,
  DISTANCE_UNITS,
  TIME_UNITS,
  SPEED_UNITS,
} from "../../../lib/calculators/speedDistanceTimeCalculator";

export default function SpeedDistanceTimeWidget() {
  const [activeTab, setActiveTab] = useState<"core" | "flight" | "runwalk" | "fuel">("core");
  const [solveFor, setSolveFor] = useState<"speed" | "distance" | "time">("speed");
  
  // Input states
  const [distance, setDistance] = useState<string>("100");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  
  const [speed, setSpeed] = useState<string>("50");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("km/h");
  
  const [time, setTime] = useState<string>("2");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("hours");

  // Calculated outputs
  const [calculatedSpeed, setCalculatedSpeed] = useState<string>("");
  const [calculatedDistance, setCalculatedDistance] = useState<string>("");
  const [calculatedTime, setCalculatedTime] = useState<string>("");
  const [formattedTimeResult, setFormattedTimeResult] = useState<string>("");

  const [copied, setCopied] = useState(false);

  // Tab 1 - Flight Time Estimator States
  const [flightDepCity, setFlightDepCity] = useState<string>("");
  const [flightArrCity, setFlightArrCity] = useState<string>("");
  const [flightDistance, setFlightDistance] = useState<string>("1000");
  const [flightSpeed, setFlightSpeed] = useState<string>("900");
  const [flightUnit, setFlightUnit] = useState<"km" | "miles">("km");

  // Tab 2 - Running/Walking Estimator States
  const [rwDistance, setRwDistance] = useState<string>("5");
  const [rwUnit, setRwUnit] = useState<"km" | "miles">("km");
  const [rwInputType, setRwInputType] = useState<"pace" | "speed">("pace");
  const [rwPaceMins, setRwPaceMins] = useState<string>("6");
  const [rwPaceSecs, setRwPaceSecs] = useState<string>("00");
  const [rwSpeed, setRwSpeed] = useState<string>("10");

  // Tab 3 - Fuel Cost Estimator States
  const [fuelDistance, setFuelDistance] = useState<string>("100");
  const [fuelEfficiency, setFuelEfficiency] = useState<string>("15");
  const [fuelEffUnit, setFuelEffUnit] = useState<"kml" | "mpg">("kml");
  const [fuelPrice, setFuelPrice] = useState<string>("1.50");

  useEffect(() => {
    const distNum = parseFloat(distance);
    const speedNum = parseFloat(speed);
    const timeNum = parseFloat(time);

    if (solveFor === "speed") {
      if (!distance || isNaN(distNum) || distNum <= 0) {
        setCalculatedSpeed("");
        return;
      }
      if (!time || isNaN(timeNum) || timeNum <= 0) {
        setCalculatedSpeed("");
        return;
      }

      const res = calculateCoreSDT({
        calculateType: "speed",
        distance: distNum,
        distanceUnit,
        time: timeNum,
        timeUnit,
        speedUnit,
      });

      if (res) {
        setCalculatedSpeed(res.speedVal.toFixed(2));
        setFormattedTimeResult(res.formattedTime);
      } else {
        setCalculatedSpeed("");
      }
    } else if (solveFor === "distance") {
      if (!speed || isNaN(speedNum) || speedNum <= 0) {
        setCalculatedDistance("");
        return;
      }
      if (!time || isNaN(timeNum) || timeNum <= 0) {
        setCalculatedDistance("");
        return;
      }

      const res = calculateCoreSDT({
        calculateType: "distance",
        speed: speedNum,
        speedUnit,
        time: timeNum,
        timeUnit,
        distanceUnit,
      });

      if (res) {
        setCalculatedDistance(res.distanceVal.toFixed(2));
        setFormattedTimeResult(res.formattedTime);
      } else {
        setCalculatedDistance("");
      }
    } else {
      // solve for time
      if (!distance || isNaN(distNum) || distNum <= 0) {
        setCalculatedTime("");
        setFormattedTimeResult("");
        return;
      }
      if (!speed || isNaN(speedNum) || speedNum <= 0) {
        setCalculatedTime("");
        setFormattedTimeResult("");
        return;
      }

      const res = calculateCoreSDT({
        calculateType: "time",
        distance: distNum,
        distanceUnit,
        speed: speedNum,
        speedUnit,
        timeUnit,
      });

      if (res) {
        setCalculatedTime(res.timeVal.toFixed(4));
        setFormattedTimeResult(res.formattedTime);
      } else {
        setCalculatedTime("");
        setFormattedTimeResult("");
      }
    }
  }, [solveFor, distance, distanceUnit, speed, speedUnit, time, timeUnit]);

  const handleCopy = async () => {
    let summary = "";
    if (solveFor === "speed" && calculatedSpeed) {
      summary = `Speed: ${calculatedSpeed} ${speedUnit} (Distance: ${distance} ${distanceUnit}, Time: ${time} ${timeUnit})`;
    } else if (solveFor === "distance" && calculatedDistance) {
      summary = `Distance: ${calculatedDistance} ${distanceUnit} (Speed: ${speed} ${speedUnit}, Time: ${time} ${timeUnit})`;
    } else if (solveFor === "time" && calculatedTime) {
      summary = `Time: ${parseFloat(calculatedTime).toFixed(2)} ${timeUnit} (${formattedTimeResult}) (Distance: ${distance} ${distanceUnit}, Speed: ${speed} ${speedUnit})`;
    } else {
      return;
    }

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportTxt = () => {
    let textContent = `QUICKCALC SPEED, DISTANCE & TIME REPORT
-----------------------------------------
`;
    if (solveFor === "speed") {
      textContent += `Solving For: Speed
Distance: ${distance} ${distanceUnit}
Time: ${time} ${timeUnit}
Calculated Speed: ${calculatedSpeed} ${speedUnit}
Formatted Time: ${formattedTimeResult}
`;
    } else if (solveFor === "distance") {
      textContent += `Solving For: Distance
Speed: ${speed} ${speedUnit}
Time: ${time} ${timeUnit}
Calculated Distance: ${calculatedDistance} ${distanceUnit}
Formatted Time: ${formattedTimeResult}
`;
    } else {
      textContent += `Solving For: Time
Distance: ${distance} ${distanceUnit}
Speed: ${speed} ${speedUnit}
Calculated Time: ${parseFloat(calculatedTime).toFixed(2)} ${timeUnit} (${formattedTimeResult})
`;
    }

    textContent += `\nCalculated 100% free with zero sign-ins at QuickCalc (https://quickcalc.cloud)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-SpeedDistanceTime-Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Speed, Distance & Time Calculator</h3>
        <p className="text-xs text-blue-100 mt-1">
          Solve for any variable instantly. Enter two values to calculate the third in real-time.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle Solve For */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            What would you like to calculate? (Solve For)
          </label>
          <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
            <button
              type="button"
              onClick={() => setSolveFor("speed")}
              className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
                solveFor === "speed"
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              ⚡ Speed
            </button>
            <button
              type="button"
              onClick={() => setSolveFor("distance")}
              className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
                solveFor === "distance"
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              📏 Distance
            </button>
            <button
              type="button"
              onClick={() => setSolveFor("time")}
              className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
                solveFor === "time"
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              ⏱️ Time
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* SPEED INPUT */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Speed
              </label>
              {solveFor === "speed" && (
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                  Calculated
                </span>
              )}
            </div>
            <div className="flex rounded-lg shadow-sm">
              <input
                type="number"
                value={solveFor === "speed" ? calculatedSpeed : speed}
                onChange={(e) => setSpeed(e.target.value)}
                disabled={solveFor === "speed"}
                className={`block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  solveFor === "speed" ? "bg-zinc-50 dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold" : ""
                }`}
                placeholder={solveFor === "speed" ? "Calculated" : "e.g. 50"}
                min="0"
                step="any"
              />
              <select
                value={speedUnit}
                onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                className="px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-700 dark:text-zinc-300 text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.keys(SPEED_UNITS).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DISTANCE INPUT */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Distance
              </label>
              {solveFor === "distance" && (
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                  Calculated
                </span>
              )}
            </div>
            <div className="flex rounded-lg shadow-sm">
              <input
                type="number"
                value={solveFor === "distance" ? calculatedDistance : distance}
                onChange={(e) => setDistance(e.target.value)}
                disabled={solveFor === "distance"}
                className={`block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  solveFor === "distance" ? "bg-zinc-50 dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold" : ""
                }`}
                placeholder={solveFor === "distance" ? "Calculated" : "e.g. 100"}
                min="0"
                step="any"
              />
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
                className="px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-700 dark:text-zinc-300 text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.keys(DISTANCE_UNITS).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TIME INPUT */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Time
              </label>
              {solveFor === "time" && (
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                  Calculated
                </span>
              )}
            </div>
            <div className="flex rounded-lg shadow-sm">
              <input
                type="number"
                value={solveFor === "time" ? (calculatedTime ? parseFloat(calculatedTime).toFixed(2) : "") : time}
                onChange={(e) => setTime(e.target.value)}
                disabled={solveFor === "time"}
                className={`block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  solveFor === "time" ? "bg-zinc-50 dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold" : ""
                }`}
                placeholder={solveFor === "time" ? "Calculated" : "e.g. 2"}
                min="0"
                step="any"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                className="px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-700 dark:text-zinc-300 text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.keys(TIME_UNITS).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RESULT PRESENTATION BOX */}
        {((solveFor === "speed" && calculatedSpeed) ||
          (solveFor === "distance" && calculatedDistance) ||
          (solveFor === "time" && calculatedTime)) ? (
          <div className="mt-8 p-6 bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl relative">
            <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
              Calculated Result
            </h4>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 block mb-1">
                  {solveFor === "speed" && "Speed"}
                  {solveFor === "distance" && "Distance"}
                  {solveFor === "time" && "Time"}
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                  {solveFor === "speed" && `${calculatedSpeed} ${speedUnit}`}
                  {solveFor === "distance" && `${calculatedDistance} ${distanceUnit}`}
                  {solveFor === "time" && `${parseFloat(calculatedTime).toFixed(2)} ${timeUnit}`}
                </span>
              </div>

              {/* Show pretty formatted duration if applicable */}
              {formattedTimeResult && (
                <div className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <span className="font-medium">⏱️ Total Duration:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {formattedTimeResult}
                  </span>
                </div>
              )}

              {/* Summary sentence */}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                {solveFor === "speed" &&
                  `Covering a distance of ${distance} ${distanceUnit} in ${time} ${timeUnit} requires an average speed of ${calculatedSpeed} ${speedUnit}.`}
                {solveFor === "distance" &&
                  `Traveling at a speed of ${speed} ${speedUnit} for ${time} ${timeUnit} covers a total distance of ${calculatedDistance} ${distanceUnit}.`}
                {solveFor === "time" &&
                  `Covering a distance of ${distance} ${distanceUnit} at a speed of ${speed} ${speedUnit} takes ${parseFloat(calculatedTime).toFixed(2)} ${timeUnit} (${formattedTimeResult}).`}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-700 dark:text-zinc-300"
              >
                {copied ? "✅ Copied!" : "📋 Copy Summary"}
              </button>
              <button
                type="button"
                onClick={handleExportTxt}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-700 dark:text-zinc-300"
              >
                💾 Export Report (.txt)
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50 border-dashed rounded-2xl text-center">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              Please enter positive values for both fields above to see live calculations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
