export type QrPayloadType = "url" | "wifi" | "vcard";
export type QrErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface QrCodeConfig {
  payloadType: QrPayloadType;
  rawUrl: string;

  // WiFi Fields
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  wifiHidden: boolean;

  // vCard Fields
  vCardFirstName: string;
  vCardLastName: string;
  vCardPhone: string;
  vCardEmail: string;
  vCardOrg: string;
  vCardTitle: string;

  // Visual Customization
  fgColor: string;
  bgColor: string;
  errorCorrectionLevel: QrErrorCorrectionLevel;
  exportSize: number; // e.g. 256, 512, 1024, 2048
  hasLogo: boolean;
  logoDataUrl?: string;
}

function escapeWifiString(str: string): string {
  return str.replace(/([\\;,:])/g, "\\$1");
}

export function buildUrlPayload(urlOrText: string): string {
  if (!urlOrText || !urlOrText.trim()) return "https://quickcalc.cloud";
  const trimmed = urlOrText.trim();
  if (!/^https?:\/\//i.test(trimmed) && /^[a-z0-9-]+(\.[a-z0-9-]+)+/i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function buildWifiPayload(
  ssid: string,
  password: string,
  encryption: "WPA" | "WEP" | "nopass" = "WPA",
  hidden: boolean = false
): string {
  const s = escapeWifiString(ssid.trim());
  const p = escapeWifiString(password.trim());
  const t = encryption === "nopass" ? "nopass" : encryption;
  const h = hidden ? "H:true;" : "";

  if (encryption === "nopass") {
    return `WIFI:S:${s};T:nopass;;`;
  }
  return `WIFI:S:${s};T:${t};P:${p};${h};`;
}

export function buildVCardPayload(
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  org: string,
  title: string
): string {
  const fn = firstName.trim();
  const ln = lastName.trim();
  const fullName = `${fn} ${ln}`.trim() || "Contact";

  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0", `N:${ln};${fn};;;`, `FN:${fullName}`];

  if (org.trim()) lines.push(`ORG:${org.trim()}`);
  if (title.trim()) lines.push(`TITLE:${title.trim()}`);
  if (phone.trim()) lines.push(`TEL;TYPE=CELL:${phone.trim()}`);
  if (email.trim()) lines.push(`EMAIL:${email.trim()}`);

  lines.push("END:VCARD");
  return lines.join("\n");
}

export function getFinalPayloadString(config: QrCodeConfig): string {
  switch (config.payloadType) {
    case "wifi":
      return buildWifiPayload(
        config.wifiSsid,
        config.wifiPassword,
        config.wifiEncryption,
        config.wifiHidden
      );
    case "vcard":
      return buildVCardPayload(
        config.vCardFirstName,
        config.vCardLastName,
        config.vCardPhone,
        config.vCardEmail,
        config.vCardOrg,
        config.vCardTitle
      );
    case "url":
    default:
      return buildUrlPayload(config.rawUrl);
  }
}

export function getQrExplanationSteps(config: QrCodeConfig, payloadString: string): string[] {
  const steps: string[] = [];

  const ecLabels: Record<QrErrorCorrectionLevel, string> = {
    L: "Low (~7% recovery)",
    M: "Medium (~15% recovery)",
    Q: "Quartile (~25% recovery)",
    H: "High (~30% recovery)",
  };

  steps.push(
    `Step 1 (Payload Encoding): Generated standard ${config.payloadType.toUpperCase()} payload string (${payloadString.length} characters) using standard specifications.`
  );
  steps.push(
    `Step 2 (Reed-Solomon Error Correction): Configured Error Correction Level ${config.errorCorrectionLevel} (${ecLabels[config.errorCorrectionLevel]}). ${
      config.hasLogo ? "High Error Correction Level (H - 30%) was automatically applied to ensure logo overlay scannability." : ""
    }`
  );
  steps.push(
    `Step 3 (Browser Canvas Rendering): Rendered QR matrix synchronously at ${config.exportSize}×${config.exportSize}px resolution using foreground (${config.fgColor}) and background (${config.bgColor}) color parameters.`
  );

  return steps;
}
