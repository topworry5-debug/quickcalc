/**
 * downloadPdf.ts — Client-side branded PDF generator using jsPDF.
 *
 * Design goals:
 *  - All rendering happens in jsPDF (vector, no canvas screenshots).
 *  - Tables paginate correctly across unlimited rows; the teal header row is
 *    repeated at the top of every new page so the document stays readable.
 *  - The caller is responsible for showing a loading state before calling
 *    `generatePdfAsync`; this module returns a Promise so the caller can
 *    `await` it and clear the spinner when done.
 *  - jsPDF is imported dynamically so it never appears in the critical-path
 *    bundle (it's ~300 KB) — only loaded on first PDF request.
 */

export interface PdfField {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export interface PdfTableData {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface GeneratePdfOptions {
  toolName: string;
  toolSlug: string;
  inputs: PdfField[];
  results: PdfField[];
  summaryNote?: string;
  table?: PdfTableData;
  filename?: string;
}

// ─── Colour palette (matches design tokens) ────────────────────────────────
const TEAL_700  = [15,  118, 110] as const;  // #0f766e
const EMERALD_50  = [236, 253, 245] as const;
const EMERALD_500 = [16,  185, 129] as const;
const EMERALD_600 = [5,   150, 105] as const;
const ZINC_50   = [248, 250, 252] as const;
const ZINC_100  = [244, 244, 245] as const;
const ZINC_200  = [228, 228, 231] as const;
const ZINC_300  = [212, 212, 216] as const;
const ZINC_500  = [113, 113, 122] as const;
const ZINC_600  = [ 82,  82,  91] as const;
const ZINC_900  = [ 24,  24,  27] as const;
const WHITE     = [255, 255, 255] as const;

// ─── Main async entry point ────────────────────────────────────────────────

/**
 * Generate and trigger download of a branded QuickCalc PDF.
 * Returns a Promise so callers can show a loading spinner and clear it when done.
 *
 * Uses `setTimeout(0)` internally so the browser can paint the loading state
 * *before* the synchronous jsPDF work begins, keeping INP < 200 ms.
 */
export function generatePdfAsync(options: GeneratePdfOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    // Yield to the browser so any pending loading-state paint can flush.
    setTimeout(async () => {
      try {
        await _buildAndSavePdf(options);
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 0);
  });
}

/**
 * Legacy synchronous wrapper kept for backwards-compat.
 * Prefer `generatePdfAsync` in new call sites.
 */
export function generatePdf(options: GeneratePdfOptions): void {
  _buildAndSavePdf(options).catch(console.error);
}

// ─── Core builder ─────────────────────────────────────────────────────────

async function _buildAndSavePdf({
  toolName,
  toolSlug,
  inputs,
  results,
  summaryNote,
  table,
  filename,
}: GeneratePdfOptions): Promise<void> {
  // Dynamic import keeps jsPDF out of the initial bundle.
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth  = doc.internal.pageSize.getWidth();  // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297
  const margin       = 15;
  const contentWidth = pageWidth - margin * 2; // 180

  let y = 15;

  // ── Helper: add a new page and reset y ──────────────────────────────────
  const addPage = () => {
    doc.addPage();
    y = 20;
    // Repeat a slim header strip on continuation pages.
    doc.setFillColor(...TEAL_700);
    doc.rect(0, 0, pageWidth, 10, "F");
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(`QuickCalc — ${toolName}`, margin, 7);
    doc.text(`quickcalc.cloud/tools/${toolSlug}`, pageWidth - margin, 7, { align: "right" });
    y = 18;
  };

  // ── Helper: guard — add new page if remaining space < minSpace ───────────
  const guardSpace = (minSpace: number) => {
    if (y + minSpace > pageHeight - 18) addPage();
  };

  // ── 1. Header Banner ────────────────────────────────────────────────────
  doc.setFillColor(...TEAL_700);
  doc.rect(0, 0, pageWidth, 24, "F");

  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("QuickCalc", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("free online calculator suite", margin + 32, 13.5);

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  doc.setFontSize(9);
  doc.text(`Generated: ${dateStr}`, pageWidth - margin, 14, { align: "right" });

  y = 33;

  // ── 2. Document Title ───────────────────────────────────────────────────
  doc.setTextColor(...ZINC_900);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`${toolName} — Summary`, margin, y);

  y += 5;
  doc.setDrawColor(...ZINC_200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ── 3. Input Parameters Box ─────────────────────────────────────────────
  if (inputs && inputs.length > 0) {
    const rowHeight = 7;
    const boxHeight = Math.ceil(inputs.length / 2) * rowHeight + 6;
    guardSpace(boxHeight + 16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...TEAL_700);
    doc.text("INPUT PARAMETERS", margin, y);
    y += 4;

    doc.setFillColor(...ZINC_50);
    doc.setDrawColor(...ZINC_200);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, "FD");

    let inputY = y + 7;
    const col1X = margin + 5;
    const col2X = margin + contentWidth / 2 + 5;

    inputs.forEach((item, index) => {
      const isCol2 = index % 2 === 1;
      const currentX = isCol2 ? col2X : col1X;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...ZINC_500);
      doc.text(`${item.label}:`, currentX, inputY);

      const labelWidth = doc.getTextWidth(`${item.label}: `);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...ZINC_900);
      doc.text(item.value, currentX + labelWidth + 2, inputY);

      if (isCol2 || index === inputs.length - 1) inputY += rowHeight;
    });

    y += boxHeight + 8;
  }

  // ── 4. Results Cards ────────────────────────────────────────────────────
  if (results && results.length > 0) {
    const cardGap    = 4;
    const cardsPerRow = Math.min(results.length, 3);
    const cardWidth  = (contentWidth - cardGap * (cardsPerRow - 1)) / cardsPerRow;
    const cardHeight = 22;
    const rowsCount  = Math.ceil(results.length / 3);
    guardSpace(rowsCount * (cardHeight + cardGap) + 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...TEAL_700);
    doc.text("CALCULATED RESULTS", margin, y);
    y += 4;

    results.forEach((res, idx) => {
      const rIdx = Math.floor(idx / 3);
      const cIdx = idx % 3;
      const cardX = margin + cIdx * (cardWidth + cardGap);
      const cardY = y + rIdx * (cardHeight + cardGap);

      if (res.isHighlight) {
        doc.setFillColor(...EMERALD_50);
        doc.setDrawColor(...EMERALD_500);
      } else {
        doc.setFillColor(...ZINC_100);
        doc.setDrawColor(...ZINC_300);
      }
      doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...ZINC_500);
      doc.text(res.label.toUpperCase(), cardX + cardWidth / 2, cardY + 7, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(res.isHighlight ? EMERALD_600[0] : ZINC_900[0],
                       res.isHighlight ? EMERALD_600[1] : ZINC_900[1],
                       res.isHighlight ? EMERALD_600[2] : ZINC_900[2]);
      doc.text(res.value, cardX + cardWidth / 2, cardY + 16, { align: "center" });
    });

    y += rowsCount * (cardHeight + cardGap) + 6;
  }

  // ── 5. Summary Note ─────────────────────────────────────────────────────
  if (summaryNote) {
    guardSpace(20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...ZINC_600);
    const splitText = doc.splitTextToSize(summaryNote, contentWidth);
    doc.text(splitText, margin, y);
    y += splitText.length * 4.5 + 6;
  }

  // ── 6. Table — fully paginated, no row cap ──────────────────────────────
  if (table && table.rows.length > 0) {
    guardSpace(30);

    if (table.title) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...TEAL_700);
      doc.text(table.title.toUpperCase(), margin, y);
      y += 6;
    }

    const colCount     = table.headers.length;
    const colWidth     = contentWidth / colCount;
    const rowH         = 6.5;
    const headerFooter = pageHeight - 22; // space reserved for page footer

    /** Draw the teal header row at the current y position. */
    const drawTableHeader = () => {
      doc.setFillColor(...TEAL_700);
      doc.rect(margin, y, contentWidth, rowH, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...WHITE);
      table!.headers.forEach((h, i) => {
        doc.text(h, margin + i * colWidth + colWidth / 2, y + 4.5, { align: "center" });
      });
      y += rowH;
    };

    drawTableHeader();

    // Render ALL rows — paginate as needed.
    for (let r = 0; r < table.rows.length; r++) {
      // If we've run out of room, start a new page and redraw the header.
      if (y + rowH > headerFooter) {
        addPage();
        drawTableHeader();
      }

      // Alternating row shading.
      if (r % 2 === 1) {
        doc.setFillColor(...ZINC_50);
        doc.rect(margin, y, contentWidth, rowH, "F");
      }

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...ZINC_900);

      const rowData = table.rows[r];
      rowData.forEach((val, c) => {
        doc.text(val, margin + c * colWidth + colWidth / 2, y + 4.5, { align: "center" });
      });

      y += rowH;
    }

    // Subtle closing border line under table.
    doc.setDrawColor(...ZINC_200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  }

  // ── 7. Footer — on every page ───────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    const footerY = pageHeight - 10;

    doc.setDrawColor(...ZINC_200);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...ZINC_500);
    doc.text(`quickcalc.cloud/tools/${toolSlug}`, margin, footerY);
    doc.text(
      `QuickCalc — 100% Free, No Sign-Up Required   •   Page ${p} of ${totalPages}`,
      pageWidth - margin,
      footerY,
      { align: "right" }
    );
  }

  // ── 8. Save ─────────────────────────────────────────────────────────────
  const outFilename = filename || `${toolSlug}-report.pdf`;
  doc.save(outFilename);
}
