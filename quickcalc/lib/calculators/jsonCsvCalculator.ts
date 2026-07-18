/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * JSON & CSV Parsing and Conversion Utilities
 */

export function flattenObject(obj: any, parentKey = "", res: any = {}): any {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const propName = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
  }
  return res;
}

export function unflattenObject(flatObj: any): any {
  const res: any = {};
  for (const key in flatObj) {
    if (Object.prototype.hasOwnProperty.call(flatObj, key)) {
      const parts = key.split(".");
      let current = res;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          // Parse values back to numbers or booleans if possible
          let val: any = flatObj[key];
          if (val === "true") val = true;
          else if (val === "false") val = false;
          else if (val === "null") val = null;
          else if (!isNaN(Number(val)) && val !== "") val = Number(val);
          current[part] = val;
        } else {
          if (!current[part] || typeof current[part] !== "object") {
            current[part] = {};
          }
          current = current[part];
        }
      }
    }
  }
  return res;
}

export function escapeCSVCell(val: any): string {
  if (val === null || val === undefined) return "";
  let str = "";
  if (typeof val === "object") {
    str = JSON.stringify(val);
  } else {
    str = String(val);
  }
  if (str.includes(",") || str.includes("\n") || str.includes("\r") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(cell);
        cell = "";
      } else if (char === "\n" || char === "\r") {
        row.push(cell);
        cell = "";
        if (row.length > 1 || row[0] !== "") {
          result.push(row);
        }
        row = [];
        if (char === "\r" && nextChar === "\n") {
          i++; // skip line feed
        }
      } else {
        cell += char;
      }
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    result.push(row);
  }
  return result;
}

export function jsonToCsv(jsonText: string): { csv: string; error?: string } {
  if (!jsonText.trim()) {
    return { csv: "" };
  }

  try {
    let parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) {
      parsed = [parsed];
    }

    if (parsed.length === 0) {
      return { csv: "" };
    }

    // Flatten all items and collect unique headers
    const flattenedList = parsed.map((item: any) => flattenObject(item));
    const headerSet = new Set<string>();
    flattenedList.forEach((flat: any) => {
      Object.keys(flat).forEach((key) => headerSet.add(key));
    });
    const headers = Array.from(headerSet);

    // Build header row
    const headerRow = headers.map(h => escapeCSVCell(h)).join(",");

    // Build data rows
    const dataRows = flattenedList.map((flat: any) => {
      return headers.map(h => escapeCSVCell(flat[h])).join(",");
    });

    return { csv: [headerRow, ...dataRows].join("\n") };
  } catch (err: any) {
    return { csv: "", error: err?.message || "Invalid JSON syntax" };
  }
}

export function csvToJson(csvText: string): { json: string; error?: string } {
  if (!csvText.trim()) {
    return { json: "" };
  }

  try {
    const rows = parseCSV(csvText);
    if (rows.length < 2) {
      return { json: "[]" };
    }

    const headers = rows[0].map(h => h.trim());
    const jsonList: any[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      // Skip empty rows
      if (row.length === 1 && row[0] === "") continue;

      const flatObj: any = {};
      headers.forEach((h, colIdx) => {
        flatObj[h] = colIdx < row.length ? row[colIdx] : "";
      });

      const unflattened = unflattenObject(flatObj);
      jsonList.push(unflattened);
    }

    return { json: JSON.stringify(jsonList, null, 2) };
  } catch (err: any) {
    return { json: "", error: err?.message || "Invalid CSV format" };
  }
}
