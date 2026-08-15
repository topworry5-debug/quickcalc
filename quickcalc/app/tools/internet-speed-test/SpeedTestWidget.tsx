"use client";

import { useState, useMemo } from "react";
import {
  SpeedTestStage,
  SpeedTestResult,
  runPingTest,
  runDownloadTest,
  runUploadTest,
  getActivityRatings,
  getSpeedTestExplanationSteps,
} from "@/lib/calculators/speedTestEngine";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import {
  Gauge,
  Wifi,
  Download,
  Upload,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export default function SpeedTestWidget() {
  const [stage, setStage] = useState<SpeedTestStage>("idle");
  const [liveValue, setLiveValue] = useState<number>(0);
  const [progressPct, setProgressPct] = useState<number>(0);

  const [pingMs, setPingMs] = useState<number>(0);
  const [jitterMs, setJitterMs] = useState<number>(0);
  const [downloadMbps, setDownloadMbps] = useState<number>(0);
  const [uploadMbps, setUploadMbps] = useState<number>(0);

  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleStartTest = async () => {
    setStage("ping");
    setLiveValue(0);
    setProgressPct(10);
    setPingMs(0);
    setJitterMs(0);
    setDownloadMbps(0);
    setUploadMbps(0);

    // 1. Run Ping & Jitter Test
    const pingRes = await runPingTest();
    setPingMs(pingRes.pingMs);
    setJitterMs(pingRes.jitterMs);
    setProgressPct(30);

    // 2. Run Download Test
    setStage("download");
    setLiveValue(0);
    const dlResult = await runDownloadTest((mbps, pct) => {
      setLiveValue(mbps);
      setProgressPct(30 + Math.round(pct * 0.35));
    });
    setDownloadMbps(dlResult);
    setProgressPct(65);

    // 3. Run Upload Test
    setStage("upload");
    setLiveValue(0);
    const ulResult = await runUploadTest((mbps, pct) => {
      setLiveValue(mbps);
      setProgressPct(65 + Math.round(pct * 0.35));
    });
    setUploadMbps(ulResult);

    // 4. Complete Test
    setStage("completed");
    setProgressPct(100);
    setLiveValue(dlResult);
  };

  const activityRatings = useMemo(
    () => (stage === "completed" ? getActivityRatings(downloadMbps, uploadMbps, pingMs) : []),
    [stage, downloadMbps, uploadMbps, pingMs]
  );

  const resultObj: SpeedTestResult = useMemo(
    () => ({
      pingMs,
      jitterMs,
      downloadMbps,
      uploadMbps,
      completedAt: new Date().toISOString(),
    }),
    [pingMs, jitterMs, downloadMbps, uploadMbps]
  );

  const explanationSteps = useMemo(
    () => (stage === "completed" ? getSpeedTestExplanationSteps(resultObj) : []),
    [stage, resultObj]
  );

  const handleDownloadPdf = () => {
    generatePdf({
      toolName: "Internet Speed & Latency Test Report",
      toolSlug: "internet-speed-test",
      inputs: [
        { label: "Test Date", value: new Date().toLocaleDateString() },
        { label: "Server Route", value: "QuickCalc Native Edge Node" },
      ],
      results: [
        { label: "Download Speed", value: `${downloadMbps} Mbps`, isHighlight: true },
        { label: "Upload Speed", value: `${uploadMbps} Mbps` },
        { label: "Ping (Latency)", value: `${pingMs} ms` },
        { label: "Jitter (Variance)", value: `${jitterMs} ms` },
      ],
      summaryNote: "Bandwidth and latency measured directly via streaming HTTP chunk payloads.",
      filename: `SpeedTest-${downloadMbps}Mbps.pdf`,
    });
  };

  const handleCopy = async () => {
    const text = `Internet Speed Test Results:\n• Download: ${downloadMbps} Mbps\n• Upload: ${uploadMbps} Mbps\n• Ping: ${pingMs} ms\n• Jitter: ${jitterMs} ms`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <Gauge size={14} className="text-blue-200" />
          <span>Real-Time Bandwidth &amp; Latency Test</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Internet Speed Test
        </h3>
        <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-md mx-auto">
          Measure download speed, upload speed, ping, and jitter with real server streaming payloads.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Main Test Focus Screen */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-6 text-center">
          {/* Animated Speedometer Canvas Representation */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Outer Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="6"
                className="text-zinc-200 dark:text-zinc-800"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * progressPct) / 100}
                strokeLinecap="round"
                className="text-blue-600 dark:text-blue-400 transition-all duration-300 ease-out"
                fill="none"
              />
            </svg>

            {/* Inner Speed Meter Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {stage === "idle" && (
                <button
                  type="button"
                  onClick={handleStartTest}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm sm:text-base flex flex-col items-center justify-center gap-1 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
                >
                  <Play size={24} fill="currentColor" />
                  <span>GO</span>
                </button>
              )}

              {stage === "ping" && (
                <div className="space-y-1 animate-pulse">
                  <Activity size={28} className="text-indigo-600 dark:text-indigo-400 mx-auto" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                    Testing Ping...
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-zinc-900 dark:text-white block">
                    {pingMs > 0 ? `${pingMs} ms` : "..."}
                  </span>
                </div>
              )}

              {(stage === "download" || stage === "upload") && (
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 block">
                    {stage === "download" ? "Downloading..." : "Uploading..."}
                  </span>
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-blue-600 dark:text-blue-400 block tracking-tight">
                    {liveValue.toFixed(1)}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 block uppercase tracking-wider">
                    Mbps
                  </span>
                </div>
              )}

              {stage === "completed" && (
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
                    Test Complete
                  </span>
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-zinc-900 dark:text-white block tracking-tight">
                    {downloadMbps.toFixed(1)}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 block uppercase tracking-wider">
                    Download Mbps
                  </span>
                  <button
                    type="button"
                    onClick={handleStartTest}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Test Again</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Privacy & Technical Disclosure Banner */}
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-left">
            <ShieldCheck size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
            <span>
              <strong>Server Data Notice:</strong> Unlike our static tools, this speed test sends temporary binary test data to our server to accurately calculate bandwidth. Data is processed live in RAM and is never stored.
            </span>
          </p>
        </div>

        {/* Numeric Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Download Mbps Card */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1">
              <Download size={13} className="text-blue-600" />
              <span>Download</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white block">
              {downloadMbps > 0 ? downloadMbps.toFixed(1) : "--"}
            </span>
            <span className="text-[10px] text-zinc-400 block font-semibold">Mbps</span>
          </div>

          {/* Upload Mbps Card */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1">
              <Upload size={13} className="text-teal-600" />
              <span>Upload</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white block">
              {uploadMbps > 0 ? uploadMbps.toFixed(1) : "--"}
            </span>
            <span className="text-[10px] text-zinc-400 block font-semibold">Mbps</span>
          </div>

          {/* Ping Card */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1">
              <Activity size={13} className="text-indigo-600" />
              <span>Ping (Latency)</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white block">
              {pingMs > 0 ? pingMs : "--"}
            </span>
            <span className="text-[10px] text-zinc-400 block font-semibold">ms</span>
          </div>

          {/* Jitter Card */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1">
              <Wifi size={13} className="text-purple-600" />
              <span>Jitter</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white block">
              {jitterMs > 0 ? jitterMs.toFixed(1) : "--"}
            </span>
            <span className="text-[10px] text-zinc-400 block font-semibold">ms</span>
          </div>
        </div>

        {/* Activity Readiness Ratings Section */}
        {stage === "completed" && activityRatings.length > 0 && (
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Sparkles size={15} className="text-blue-600" />
              <span>Network Capability Analysis</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activityRatings.map((act, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    act.isSupported
                      ? "bg-emerald-500/5 border-emerald-500/20 text-zinc-900 dark:text-zinc-100"
                      : "bg-rose-500/5 border-rose-500/20 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {act.isSupported ? (
                    <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-0.5">
                    <span className="text-xs font-bold block">{act.name}</span>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions Bar */}
        {stage === "completed" && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <DownloadPdfButton onClick={handleDownloadPdf} />

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Copied Results!" : "Copy Speed Summary"}</span>
            </button>

            <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
          </div>
        )}

        {/* Step-by-Step Explanation Accordion */}
        {stage === "completed" && <ExplainResultAccordion steps={explanationSteps} />}
      </div>

      {/* Share Modal */}
      <ShareResultModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={{
          toolName: "Internet Speed Test",
          toolSlug: "internet-speed-test",
          category: "Utilities & Network",
          resultValue: `${downloadMbps.toFixed(1)} Mbps Download`,
          resultLabel: "Connection Bandwidth Test",
          inputsSummary: [
            { label: "Download", value: `${downloadMbps.toFixed(1)} Mbps` },
            { label: "Upload", value: `${uploadMbps.toFixed(1)} Mbps` },
            { label: "Ping", value: `${pingMs} ms` },
          ],
          queryParams: {},
        }}
      />
    </div>
  );
}
