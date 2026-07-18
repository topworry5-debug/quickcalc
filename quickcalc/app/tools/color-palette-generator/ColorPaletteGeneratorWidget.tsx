"use client";

import React, { useState, useRef, useEffect } from "react";
import { extractDominantColors, getContrastRatio } from "@/lib/calculators/colorExtractor";

export default function ColorPaletteGeneratorWidget() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default initial demo colors when no image is uploaded yet
  useEffect(() => {
    setColors(["#0ea5e9", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#10b981", "#f59e0b", "#3b82f6"]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Please select an image smaller than 10MB.");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Unsupported file format. Please upload a valid image file (PNG, JPG, WEBP, GIF, etc.).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        setError("Failed to read the file. It might be corrupted.");
        return;
      }
      setImageSrc(dataUrl);
      extractColorsFromUrl(dataUrl);
    };
    reader.onerror = () => {
      setError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const extractColorsFromUrl = (url: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setError("Could not initialize color extractor context.");
          return;
        }

        // Scale down to max 300x300 for blazing fast extraction
        const maxDim = 300;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const extracted = extractDominantColors(canvas, 8);
        if (extracted.length === 0) {
          setError("Failed to extract colors from this image. Try another one.");
        } else {
          setColors(extracted);
        }
      } catch (err) {
        console.error("Extraction error:", err);
        setError("An error occurred while analyzing the image. It might be corrupt or in an incompatible format.");
      }
    };
    img.onerror = () => {
      setError("Failed to load image. The image file might be corrupted or invalid.");
    };
    img.src = url;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyFormat = (type: "css" | "tailwind" | "hex") => {
    let text = "";
    if (type === "css") {
      text = ":root {\n" + colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n") + "\n}";
    } else if (type === "tailwind") {
      const colorsObj = colors.reduce((acc, c, i) => {
        acc[`color-${i + 1}`] = c;
        return acc;
      }, {} as Record<string, string>);
      text = "colors: " + JSON.stringify(colorsObj, null, 2);
    } else {
      text = colors.join(", ");
    }

    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1500);
  };

  // Generate contrast pairs from extracted colors (maximum 28 pairs for 8 colors)
  const getContrastPairs = () => {
    const pairs: { c1: string; c2: string; ratio: number; passes: boolean }[] = [];
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const ratio = getContrastRatio(colors[i], colors[j]);
        pairs.push({
          c1: colors[i],
          c2: colors[j],
          ratio,
          passes: ratio >= 4.5, // WCAG AA normal text threshold
        });
      }
    }
    // Sort so higher contrast ratios or passes are presented beautifully
    return pairs.sort((a, b) => b.ratio - a.ratio);
  };

  const contrastPairs = getContrastPairs();

  return (
    <div className="space-y-8">
      {/* Privacy Notice Box */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
        <span className="text-xl">🛡️</span>
        <p className="leading-relaxed">
          <strong>100% Client-Side Processing:</strong> All color extraction is completed instantly in your browser via HTML5 Canvas. Your image is never uploaded to a server, fully protecting your privacy.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 p-4 rounded-xl text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Input Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[220px] ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10"
            : "border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-zinc-900/50"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {imageSrc ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Uploaded workspace"
              className="w-32 h-32 object-cover rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800"
            />
            <div className="text-left space-y-2">
              <p className="font-bold text-zinc-900 dark:text-white">Active Image</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Drag & drop or click again to upload a different image.
              </p>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400">
                Ready
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl">🖼️</div>
            <div>
              <p className="text-base font-semibold text-zinc-900 dark:text-white">
                Drag & Drop your image here
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Supports PNG, JPG, WEBP, and SVG (Max 10MB)
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg shadow-sm transition">
              Select Image
            </button>
          </div>
        )}
      </div>

      {/* Extracted Swatches */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Generated Color Palette
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Extracted 6-8 distinct dominant colors. Click any swatch to copy its Hex code.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => copyFormat("css")}
              className="px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition"
            >
              {copiedType === "css" ? "Copied CSS! ✓" : "Copy CSS Variables"}
            </button>
            <button
              onClick={() => copyFormat("tailwind")}
              className="px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition"
            >
              {copiedType === "tailwind" ? "Copied Tailwind! ✓" : "Copy Tailwind Config"}
            </button>
            <button
              onClick={() => copyFormat("hex")}
              className="px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition"
            >
              {copiedType === "hex" ? "Copied List! ✓" : "Copy Hex List"}
            </button>
          </div>
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {colors.map((hex, index) => (
            <div
              key={hex + index}
              onClick={() => copyToClipboard(hex, index)}
              className="group cursor-pointer flex flex-col items-center space-y-2 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-150 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
            >
              <div
                className="w-full h-24 rounded-lg shadow-inner border border-zinc-200/50 dark:border-zinc-800/50 relative overflow-hidden"
                style={{ backgroundColor: hex }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]">
                  <span className="text-[10px] font-bold text-white uppercase bg-black/60 px-2 py-1 rounded-md">
                    {copiedIndex === index ? "Copied!" : "Copy Hex"}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 uppercase">
                  {hex}
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                  Color {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG Contrast/Accessibility Check */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            WCAG Accessibility & Contrast Grid
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Evaluating every extracted color pair for readability. WCAG AA requires a minimum ratio of <strong>4.5:1</strong> for readable normal text.
          </p>
        </div>

        <div className="max-h-96 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800 scrollbar-thin">
          {contrastPairs.length === 0 ? (
            <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Not enough colors available. Extract colors to view accessibility pairs.
            </div>
          ) : (
            contrastPairs.map((pair, index) => (
              <div
                key={index}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/30 dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition"
              >
                {/* Visual Preview */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div
                      className="w-8 h-8 rounded-full border border-white dark:border-zinc-900 shadow-sm"
                      style={{ backgroundColor: pair.c1 }}
                    />
                    <div
                      className="w-8 h-8 rounded-full border border-white dark:border-zinc-900 shadow-sm"
                      style={{ backgroundColor: pair.c2 }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-800 dark:text-zinc-200">
                      <span>{pair.c1}</span>
                      <span className="text-zinc-400">↔</span>
                      <span>{pair.c2}</span>
                    </div>
                    {/* Live Preview Sample Text */}
                    <div
                      className="mt-1 text-xs px-2.5 py-1 rounded-md text-center max-w-[180px] font-medium"
                      style={{ backgroundColor: pair.c1, color: pair.c2 }}
                    >
                      Sample text view
                    </div>
                  </div>
                </div>

                {/* Score and Status Badge */}
                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {pair.ratio.toFixed(2)}:1
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                      Contrast Ratio
                    </p>
                  </div>

                  {pair.passes ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      AA Pass
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
                      Fail
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
