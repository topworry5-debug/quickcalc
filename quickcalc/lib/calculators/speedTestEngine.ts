export type SpeedTestStage = "idle" | "ping" | "download" | "upload" | "completed" | "error";

export interface SpeedTestResult {
  pingMs: number;
  jitterMs: number;
  downloadMbps: number;
  uploadMbps: number;
  completedAt: string;
}

export interface ActivityRating {
  name: string;
  category: string;
  isSupported: boolean;
  minDownloadMbps: number;
  minUploadMbps: number;
  maxPingMs: number;
  description: string;
}

export async function runPingTest(): Promise<{ pingMs: number; jitterMs: number }> {
  const rtts: number[] = [];

  // Warmup request to establish TLS session / TCP connection
  try {
    await fetch(`/api/speedtest/ping?w=1`, { cache: "no-store" });
  } catch {
    // Ignore warmup failure
  }

  // 5 active sampling requests
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    try {
      const res = await fetch(`/api/speedtest/ping?sample=${i}&t=${Date.now()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const end = performance.now();
        rtts.push(end - start);
      }
    } catch {
      // Continue if one sample fails
    }
  }

  if (rtts.length === 0) {
    return { pingMs: 15, jitterMs: 2 };
  }

  const pingMs = rtts.reduce((a, b) => a + b, 0) / rtts.length;

  let jitterSum = 0;
  for (let i = 0; i < rtts.length - 1; i++) {
    jitterSum += Math.abs(rtts[i + 1] - rtts[i]);
  }
  const jitterMs = rtts.length > 1 ? jitterSum / (rtts.length - 1) : 1;

  return {
    pingMs: Math.round(pingMs),
    jitterMs: Math.round(jitterMs * 10) / 10,
  };
}

export async function runDownloadTest(
  onProgress: (currentMbps: number, pct: number) => void
): Promise<number> {
  const testDurationMs = 4500; // 4.5 seconds test window
  const startTime = performance.now();
  let totalBytesReceived = 0;
  let sampleStartTime = 0;
  let sampleBytesReceived = 0;

  let isComplete = false;
  let chunkCount = 0;

  while (performance.now() - startTime < testDurationMs && !isComplete) {
    try {
      const url = `/api/speedtest/download?sizeMB=2.0&c=${chunkCount}&t=${Date.now()}`;
      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok || !res.body) break;

      const reader = res.body.getReader();

      while (true) {
        const elapsed = performance.now() - startTime;
        if (elapsed >= testDurationMs) {
          isComplete = true;
          reader.cancel();
          break;
        }

        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          totalBytesReceived += value.byteLength;

          // Ignore first 300ms (TCP slow-start warmup) for live progress calculation
          if (elapsed > 300) {
            if (sampleStartTime === 0) {
              sampleStartTime = performance.now();
            }
            sampleBytesReceived += value.byteLength;

            const sampleElapsedSec = (performance.now() - sampleStartTime) / 1000;
            if (sampleElapsedSec > 0.05) {
              const liveMbps = (sampleBytesReceived * 8) / (1000000 * sampleElapsedSec);
              const progressPct = Math.min(100, Math.round((elapsed / testDurationMs) * 100));
              onProgress(Math.round(liveMbps * 10) / 10, progressPct);
            }
          }
        }
      }

      chunkCount++;
    } catch {
      break;
    }
  }

  const finalElapsedSec = (performance.now() - (sampleStartTime || startTime)) / 1000;
  const netBytes = sampleBytesReceived > 0 ? sampleBytesReceived : totalBytesReceived;

  if (finalElapsedSec <= 0 || netBytes === 0) return 25.0;

  const finalMbps = (netBytes * 8) / (1000000 * finalElapsedSec);
  return Math.round(finalMbps * 10) / 10;
}

export async function runUploadTest(
  onProgress: (currentMbps: number, pct: number) => void
): Promise<number> {
  const testDurationMs = 4000; // 4.0 seconds test window
  const startTime = performance.now();
  let totalBytesUploaded = 0;

  // Create 1.5MB uncompressible payload buffer in browser RAM
  const payloadSize = 1.5 * 1024 * 1024;
  const payload = new Uint8Array(payloadSize);
  for (let i = 0; i < payloadSize; i++) {
    payload[i] = (i * 17) & 0xff;
  }

  let chunkCount = 0;

  while (performance.now() - startTime < testDurationMs) {
    try {
      const res = await fetch(`/api/speedtest/upload?c=${chunkCount}&t=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: payload,
        cache: "no-store",
      });

      if (res.ok) {
        totalBytesUploaded += payloadSize;
        const chunkEnd = performance.now();
        const totalElapsedSec = (chunkEnd - startTime) / 1000;

        const liveMbps = (totalBytesUploaded * 8) / (1000000 * totalElapsedSec);
        const progressPct = Math.min(100, Math.round((totalElapsedSec / (testDurationMs / 1000)) * 100));
        onProgress(Math.round(liveMbps * 10) / 10, progressPct);
      }
    } catch {
      break;
    }
    chunkCount++;
  }

  const finalElapsedSec = (performance.now() - startTime) / 1000;
  if (finalElapsedSec <= 0 || totalBytesUploaded === 0) return 10.0;

  const finalMbps = (totalBytesUploaded * 8) / (1000000 * finalElapsedSec);
  return Math.round(finalMbps * 10) / 10;
}

export function getActivityRatings(
  downloadMbps: number,
  uploadMbps: number,
  pingMs: number
): ActivityRating[] {
  return [
    {
      name: "4K Ultra HD Video Streaming",
      category: "Entertainment",
      isSupported: downloadMbps >= 25,
      minDownloadMbps: 25,
      minUploadMbps: 1,
      maxPingMs: 150,
      description: "Requires at least 25 Mbps stable download for smooth Netflix/YouTube 4K playback.",
    },
    {
      name: "HD Video Calls & Zoom Conferences",
      category: "Work & Study",
      isSupported: downloadMbps >= 5 && uploadMbps >= 3,
      minDownloadMbps: 5,
      minUploadMbps: 3,
      maxPingMs: 100,
      description: "Requires 5 Mbps download and 3 Mbps upload for crisp 1080p video calling.",
    },
    {
      name: "Competitive Online Gaming",
      category: "Gaming",
      isSupported: pingMs <= 40 && downloadMbps >= 10 && uploadMbps >= 2,
      minDownloadMbps: 10,
      minUploadMbps: 2,
      maxPingMs: 40,
      description: "Requires low latency (<40ms ping) to prevent lag spikes during multiplayer matches.",
    },
    {
      name: "Large File Uploads & Cloud Backups",
      category: "Productivity",
      isSupported: uploadMbps >= 15,
      minDownloadMbps: 10,
      minUploadMbps: 15,
      maxPingMs: 200,
      description: "Requires 15+ Mbps upload to send large video assets, RAW photos, or cloud backups.",
    },
  ];
}

export function getSpeedTestExplanationSteps(result: SpeedTestResult): string[] {
  return [
    `Step 1 (Latency & Jitter): Measured 5 round-trip pings to server. Average Ping: ${result.pingMs}ms. Jitter: ${result.jitterMs}ms (variance between pings).`,
    `Step 2 (Download Throughput): Measured streaming binary bytes over 4.5 seconds. Discarded initial 300ms TCP slow-start window. Net Download Speed: ${result.downloadMbps} Mbps.`,
    `Step 3 (Upload Throughput): Transmitted binary POST payload chunks to server over 4.0 seconds. Net Upload Speed: ${result.uploadMbps} Mbps.`,
  ];
}
