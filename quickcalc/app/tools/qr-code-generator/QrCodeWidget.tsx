"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import QRCode from "qrcode";
import {
  QrCodeConfig,
  QrPayloadType,
  QrErrorCorrectionLevel,
  getFinalPayloadString,
  getQrExplanationSteps,
} from "@/lib/calculators/qrCodeGenerator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import {
  QrCode,
  Globe,
  Wifi,
  User,
  Download,
  Copy,
  Check,
  FileCode,
  Palette,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";

export default function QrCodeWidget() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [payloadType, setPayloadType] = useState<QrPayloadType>("url");
  const [rawUrl, setRawUrl] = useState<string>("https://quickcalc.cloud");

  // WiFi Fields
  const [wifiSsid, setWifiSsid] = useState<string>("Office_Guest_WiFi");
  const [wifiPassword, setWifiPassword] = useState<string>("ConnectFast2026!");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);

  // vCard Fields
  const [vCardFirstName, setVCardFirstName] = useState<string>("Sarah");
  const [vCardLastName, setVCardLastName] = useState<string>("Jenkins");
  const [vCardPhone, setVCardPhone] = useState<string>("+1 (555) 234-5678");
  const [vCardEmail, setVCardEmail] = useState<string>("sarah.j@example.com");
  const [vCardOrg, setVCardOrg] = useState<string>("QuickCalc Solutions");
  const [vCardTitle, setVCardTitle] = useState<string>("Lead Product Manager");

  // Styling & Customization
  const [fgColor, setFgColor] = useState<string>("#0f172a");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QrErrorCorrectionLevel>("M");
  const [exportSize, setExportSize] = useState<number>(512);

  // Logo Overlay
  const [hasLogo, setHasLogo] = useState<boolean>(false);
  const [logoDataUrl, setLogoDataUrl] = useState<string>("");

  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hydrate from URL state
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const type = sp.get("type") as QrPayloadType;
    if (type && ["url", "wifi", "vcard"].includes(type)) setPayloadType(type);

    const u = sp.get("u");
    if (u) setRawUrl(u);
  }, []);

  useCalculatorUrlState(
    {
      type: payloadType !== "url" ? payloadType : undefined,
      u: payloadType === "url" && rawUrl !== "https://quickcalc.cloud" ? rawUrl : undefined,
    },
    onHydrate
  );

  const config: QrCodeConfig = useMemo(
    () => ({
      payloadType,
      rawUrl,
      wifiSsid,
      wifiPassword,
      wifiEncryption,
      wifiHidden,
      vCardFirstName,
      vCardLastName,
      vCardPhone,
      vCardEmail,
      vCardOrg,
      vCardTitle,
      fgColor,
      bgColor,
      errorCorrectionLevel: hasLogo ? "H" : errorCorrectionLevel,
      exportSize,
      hasLogo,
      logoDataUrl,
    }),
    [
      payloadType,
      rawUrl,
      wifiSsid,
      wifiPassword,
      wifiEncryption,
      wifiHidden,
      vCardFirstName,
      vCardLastName,
      vCardPhone,
      vCardEmail,
      vCardOrg,
      vCardTitle,
      fgColor,
      bgColor,
      errorCorrectionLevel,
      exportSize,
      hasLogo,
      logoDataUrl,
    ]
  );

  const payloadString = useMemo(() => getFinalPayloadString(config), [config]);

  // Real-time Canvas Rendering
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const effectiveEcLevel = hasLogo ? "H" : errorCorrectionLevel;

    QRCode.toCanvas(
      canvas,
      payloadString,
      {
        width: exportSize,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: effectiveEcLevel,
      },
      (error) => {
        if (error) {
          console.error("QR Code rendering error:", error);
          return;
        }

        // Render Center Logo Overlay if enabled
        if (hasLogo && logoDataUrl) {
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = logoDataUrl;
          img.onload = () => {
            const logoSize = Math.floor(exportSize * 0.22); // ~22% of canvas size
            const x = (exportSize - logoSize) / 2;
            const y = (exportSize - logoSize) / 2;

            // Draw white/background protective square padding around logo
            ctx.fillStyle = bgColor;
            const pad = Math.floor(logoSize * 0.1);
            ctx.fillRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2);

            // Draw rounded border frame
            ctx.strokeStyle = fgColor;
            ctx.lineWidth = Math.max(2, Math.floor(exportSize * 0.005));
            ctx.strokeRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2);

            // Draw logo image
            ctx.drawImage(img, x, y, logoSize, logoSize);
          };
        }
      }
    );
  }, [payloadString, fgColor, bgColor, errorCorrectionLevel, exportSize, hasLogo, logoDataUrl]);

  // Logo file upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoDataUrl(event.target.result as string);
        setHasLogo(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `QRCode-${config.payloadType}-${exportSize}px.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSvg = async () => {
    try {
      const effectiveEcLevel = hasLogo ? "H" : errorCorrectionLevel;
      const svgString = await QRCode.toString(payloadString, {
        type: "svg",
        width: exportSize,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: effectiveEcLevel,
      });

      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `QRCode-${config.payloadType}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("SVG generation error", err);
    }
  };

  const handleDownloadPdf = () => {
    generatePdf({
      toolName: "QR Code Vector & Print Spec Report",
      toolSlug: "qr-code-generator",
      inputs: [
        { label: "QR Code Type", value: config.payloadType.toUpperCase() },
        { label: "Export Resolution", value: `${exportSize} × ${exportSize} px` },
        { label: "Error Correction Level", value: `${config.errorCorrectionLevel} (${hasLogo ? "High locked for logo" : "Standard"})` },
      ],
      results: [
        { label: "Payload String", value: payloadString, isHighlight: true },
        { label: "Foreground Color", value: fgColor },
        { label: "Background Color", value: bgColor },
        { label: "Center Logo", value: hasLogo ? "Embedded" : "None" },
      ],
      summaryNote: `High-resolution QR code generated for ${config.payloadType.toUpperCase()} payload. Rendered 100% locally in browser.`,
      filename: `QRCode-${config.payloadType}-Spec.pdf`,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payloadString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy payload", err);
    }
  };

  const explanationSteps = useMemo(
    () => getQrExplanationSteps(config, payloadString),
    [config, payloadString]
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <QrCode size={14} className="text-emerald-200" />
          <span>High-Resolution QR Generator</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          QR Code Generator
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
          Generate custom QR codes for URLs, WiFi networks, and vCard contact details with high-resolution PNG &amp; SVG downloads.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Payload Type Selector Tabs */}
        <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800/60 p-1 gap-1">
          <button
            type="button"
            onClick={() => setPayloadType("url")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              payloadType === "url"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Globe size={14} />
            <span>Website / URL</span>
          </button>
          <button
            type="button"
            onClick={() => setPayloadType("wifi")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              payloadType === "wifi"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Wifi size={14} />
            <span>WiFi Network</span>
          </button>
          <button
            type="button"
            onClick={() => setPayloadType("vcard")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              payloadType === "vcard"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <User size={14} />
            <span>vCard Contact</span>
          </button>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Form Inputs (Left Column) */}
          <div className="space-y-4">
            {/* Tab 1: URL / Plain Text Inputs */}
            {payloadType === "url" && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Target Website URL or Text
                </label>
                <input
                  type="text"
                  value={rawUrl}
                  onChange={(e) => setRawUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  placeholder="https://example.com or any plain text..."
                />
              </div>
            )}

            {/* Tab 2: WiFi Network Inputs */}
            {payloadType === "wifi" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="e.g. Home_Network_5G"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    WiFi Password
                  </label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="Enter network password..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Encryption Type
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value as "WPA" | "WEP" | "nopass")}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>

                  <div className="space-y-1 flex flex-col justify-end">
                    <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer pb-2">
                      <input
                        type="checkbox"
                        checked={wifiHidden}
                        onChange={(e) => setWifiHidden(e.target.checked)}
                        className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span>Hidden Network</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: vCard Contact Card Inputs */}
            {payloadType === "vcard" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">First Name</label>
                    <input
                      type="text"
                      value={vCardFirstName}
                      onChange={(e) => setVCardFirstName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Last Name</label>
                    <input
                      type="text"
                      value={vCardLastName}
                      onChange={(e) => setVCardLastName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Phone Number</label>
                    <input
                      type="text"
                      value={vCardPhone}
                      onChange={(e) => setVCardPhone(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Email Address</label>
                    <input
                      type="email"
                      value={vCardEmail}
                      onChange={(e) => setVCardEmail(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Company / Org</label>
                    <input
                      type="text"
                      value={vCardOrg}
                      onChange={(e) => setVCardOrg(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Job Title</label>
                    <input
                      type="text"
                      value={vCardTitle}
                      onChange={(e) => setVCardTitle(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Customization Options Box */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Palette size={14} className="text-emerald-600" />
                <span>Colors &amp; Customization</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* Foreground Color Picker */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block">Foreground Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Background Color Picker */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Error Correction Level */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block">
                    Error Correction Level
                  </label>
                  <select
                    value={hasLogo ? "H" : errorCorrectionLevel}
                    disabled={hasLogo}
                    onChange={(e) => setErrorCorrectionLevel(e.target.value as QrErrorCorrectionLevel)}
                    className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1.5 text-xs font-semibold focus:outline-none disabled:opacity-60"
                  >
                    <option value="L">L - Low (7% Recovery)</option>
                    <option value="M">M - Medium (15% Recovery)</option>
                    <option value="Q">Q - Quartile (25% Recovery)</option>
                    <option value="H">H - High (30% Recovery)</option>
                  </select>
                </div>

                {/* Export Resolution Size */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block">
                    Export Resolution
                  </label>
                  <select
                    value={exportSize}
                    onChange={(e) => setExportSize(parseInt(e.target.value, 10))}
                    className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value={256}>256 × 256 px (Web)</option>
                    <option value={512}>512 × 512 px (Standard)</option>
                    <option value={1024}>1024 × 1024 px (Print HD)</option>
                    <option value={2048}>2048 × 2048 px (Ultra HD)</option>
                  </select>
                </div>
              </div>

              {/* Optional Center Logo Upload */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <ImageIcon size={13} className="text-teal-600" />
                    <span>Center Logo Overlay (Optional)</span>
                  </label>
                  {hasLogo && (
                    <button
                      type="button"
                      onClick={() => {
                        setHasLogo(false);
                        setLogoDataUrl("");
                      }}
                      className="text-[10px] text-rose-600 dark:text-rose-400 font-bold hover:underline"
                    >
                      Remove Logo
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleLogoUpload}
                  className="w-full text-xs text-zinc-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                />

                {hasLogo && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="shrink-0 text-amber-600" />
                    <span>
                      High Error Correction (H - 30%) auto-applied so scanner modules stay readable with your logo overlay.
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Real-time Canvas & Download Panel (Right Column) */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-between text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Live QR Preview ({exportSize}×{exportSize}px)
            </span>

            {/* Canvas Container */}
            <div className="p-3 bg-white rounded-xl shadow-md border border-zinc-200/80 flex items-center justify-center max-w-[280px]">
              <canvas ref={canvasRef} className="max-w-full h-auto rounded" />
            </div>

            {/* Quick Download Buttons */}
            <div className="w-full space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download size={14} />
                  <span>Download PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <FileCode size={14} />
                  <span>Download SVG</span>
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">Encoded Payload String</span>
                <p className="text-[11px] font-mono text-zinc-800 dark:text-zinc-200 truncate">
                  {payloadString}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <DownloadPdfButton onClick={handleDownloadPdf} />

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? "Copied Payload!" : "Copy Payload String"}</span>
          </button>

          <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
        </div>

        {/* Step-by-Step Mathematical Explanation Accordion */}
        <ExplainResultAccordion steps={explanationSteps} />
      </div>

      {/* Share Modal */}
      <ShareResultModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={{
          toolName: "QR Code Generator",
          toolSlug: "qr-code-generator",
          category: "Utilities & Vector Tools",
          resultValue: config.payloadType.toUpperCase(),
          resultLabel: `QR Code Payload (${exportSize}px Resolution)`,
          inputsSummary: [
            { label: "Type", value: config.payloadType.toUpperCase() },
            { label: "Error Correction", value: config.errorCorrectionLevel },
          ],
          queryParams: {
            type: payloadType,
            u: rawUrl,
          },
        }}
      />
    </div>
  );
}
