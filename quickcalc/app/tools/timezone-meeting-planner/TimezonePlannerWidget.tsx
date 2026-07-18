"use client";

import { useState, useEffect, useMemo } from "react";
import { BUSINESS_HUBS, calculateTimezoneOverlap, getSourceDate } from "../../../lib/calculators/timezonePlanner";

export default function TimezonePlannerWidget() {
  const [sourceTime, setSourceTime] = useState<string>("09:00");
  const [sourceDateStr, setSourceDateStr] = useState<string>("");
  const [sourceTimezone, setSourceTimezone] = useState<string>("America/New_York");
  const [selectedHubs, setSelectedHubs] = useState<string[]>([
    "America/Los_Angeles",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
  ]);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Initialize date & local timezone on mount
  useEffect(() => {
    // Current date in YYYY-MM-DD format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setSourceDateStr(`${yyyy}-${mm}-${dd}`);

    // Pre-select user's local timezone if available and supported
    try {
      const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (localTz) {
        setSourceTimezone(localTz);
      }
    } catch (e) {
      console.warn("Could not auto-detect timezone", e);
    }
  }, []);

  // Parse shareable link hash on mount if present
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      try {
        const hash = decodeURIComponent(window.location.hash.substring(1));
        const params = new URLSearchParams(hash);
        const urlTime = params.get("time");
        const urlTz = params.get("tz");
        const urlHubs = params.get("hubs");

        if (urlTime) setSourceTime(urlTime);
        if (urlTz) setSourceTimezone(urlTz);
        if (urlHubs) setSelectedHubs(urlHubs.split(","));
      } catch (e) {
        console.error("Failed to parse shareable hash link", e);
      }
    }
  }, []);

  // Sync state to location hash for shareable links
  const shareableLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams();
    params.set("time", sourceTime);
    params.set("tz", sourceTimezone);
    params.set("hubs", selectedHubs.join(","));
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#${encodeURIComponent(params.toString())}`;
  }, [sourceTime, sourceTimezone, selectedHubs]);

  // Compute final Date object corresponding to input time & date in source timezone
  const baseDate = useMemo(() => {
    if (!sourceDateStr) return new Date();
    return getSourceDate(sourceTime, sourceDateStr, sourceTimezone);
  }, [sourceTime, sourceDateStr, sourceTimezone]);

  // Perform conversions across selected cities
  const results = useMemo(() => {
    return calculateTimezoneOverlap(baseDate, sourceTimezone, selectedHubs);
  }, [baseDate, sourceTimezone, selectedHubs]);

  const toggleHub = (tz: string) => {
    setSelectedHubs(prev => {
      if (prev.includes(tz)) {
        return prev.filter(item => item !== tz);
      } else {
        return [...prev, tz];
      }
    });
  };

  const handleCopyTable = async () => {
    if (results.rows.length === 0) return;
    const lines = [
      `--- Timezone Meeting Plan Breakdown ---`,
      `Reference Timezone: ${sourceTimezone} (${sourceTime} on ${sourceDateStr})`,
      `---------------------------------------`,
      ...results.rows.map(row => {
        const workTag = row.isWorkingHours ? " [Working Hours]" : " [Outside Working Hours]";
        return `${row.name} (${row.country}): ${row.formattedTime} - ${row.formattedDate} (${row.dayOffsetLabel})${workTag}`;
      }),
      `---------------------------------------`,
      `Share this configuration: ${shareableLink}`,
    ];

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopiedTable(true);
      setTimeout(() => setCopiedTable(false), 2000);
    } catch (err) {
      console.error("Failed to copy table text", err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy share link", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <span>🕒 Secure Team Timezone Meeting Planner</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          Zero signup required. Plan meetings safely across real IANA timezones and copy shareable setups.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Core Inputs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          {/* Reference Time */}
          <div className="space-y-1.5">
            <label htmlFor="ref-time" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Meeting Time
            </label>
            <input
              id="ref-time"
              type="time"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
              className="block w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-900 dark:text-white"
            />
          </div>

          {/* Reference Date */}
          <div className="space-y-1.5">
            <label htmlFor="ref-date" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Meeting Date
            </label>
            <input
              id="ref-date"
              type="date"
              value={sourceDateStr}
              onChange={(e) => setSourceDateStr(e.target.value)}
              className="block w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-900 dark:text-white"
            />
          </div>

          {/* Reference Timezone */}
          <div className="space-y-1.5">
            <label htmlFor="ref-timezone" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Your Timezone
            </label>
            <select
              id="ref-timezone"
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
              className="block w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-900 dark:text-white"
            >
              {BUSINESS_HUBS.map((hub) => (
                <option key={hub.timezone} value={hub.timezone}>
                  {hub.name} ({hub.timezone})
                </option>
              ))}
              {/* Fallback if user's timezone isn't a primary business hub */}
              {!BUSINESS_HUBS.some(h => h.timezone === sourceTimezone) && (
                <option value={sourceTimezone}>{sourceTimezone}</option>
              )}
            </select>
          </div>
        </div>

        {/* Hub Comparison Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Compare Against Core Global Hubs
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {BUSINESS_HUBS.map((hub) => {
              const isSelected = selectedHubs.includes(hub.timezone);
              return (
                <button
                  key={hub.timezone}
                  type="button"
                  onClick={() => toggleHub(hub.timezone)}
                  className={`p-3 text-left border rounded-xl transition flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-transparent"
                  }`}
                >
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{hub.name}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{hub.country}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Output Comparison Matrix */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Live Local Overlap Times
          </label>
          {results.rows.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-zinc-950/10">
              <span className="text-2xl mb-1 block">📍</span>
              <p className="text-xs text-zinc-400">Please select at least one city hub to display overlap calculations.</p>
            </div>
          ) : (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/20 dark:bg-zinc-950/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                      <th className="p-3.5 font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">City Hub</th>
                      <th className="p-3.5 font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Local Time</th>
                      <th className="p-3.5 font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Calendar Date</th>
                      <th className="p-3.5 font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Working Hours Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {results.rows.map((row) => (
                      <tr key={row.timezone} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                        <td className="p-3.5">
                          <span className="font-bold text-zinc-900 dark:text-white block">{row.name}</span>
                          <span className="text-[10px] text-zinc-400 truncate">{row.timezone}</span>
                        </td>
                        <td className="p-3.5 font-semibold text-sm text-zinc-800 dark:text-zinc-200 font-mono">
                          {row.formattedTime}
                        </td>
                        <td className="p-3.5">
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{row.formattedDate}</span>
                          {row.dayOffsetLabel !== "Same Day" && (
                            <span className={`block text-[10px] font-bold mt-0.5 ${
                              row.dayOffsetLabel.includes("Tomorrow") ? "text-blue-500" : "text-amber-500"
                            }`}>
                              {row.dayOffsetLabel}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {row.isWorkingHours ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                              🟢 Overlap: Inside Core Hours
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                              🔴 Outside Typical Working Hours
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Global Share Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopyTable}
              disabled={results.rows.length === 0}
              className={`font-semibold text-xs px-5 py-3 rounded-lg shadow-sm focus:outline-none transition-all ${
                results.rows.length > 0
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                  : "bg-zinc-50 dark:bg-zinc-950/20 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {copiedTable ? "✅ Summary Copied!" : "📋 Copy Meeting Summary"}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold text-xs px-5 py-3 rounded-lg transition focus:outline-none border border-zinc-200/40 dark:border-zinc-800/40"
            >
              {copiedLink ? "🔗 Share Link Copied!" : "🔗 Copy Shareable Link"}
            </button>
          </div>

          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium italic">
            *Working hours are defined as 8:00 AM – 7:00 PM local time.
          </span>
        </div>
      </div>
    </div>
  );
}
