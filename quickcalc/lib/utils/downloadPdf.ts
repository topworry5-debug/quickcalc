import { jsPDF } from "jspdf";

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

export function generatePdf({
  toolName,
  toolSlug,
  inputs,
  results,
  summaryNote,
  table,
  filename,
}: GeneratePdfOptions) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
  const margin = 15;
  const contentWidth = pageWidth - margin * 2; // 180 mm

  let y = 15;

  // 1. Header Banner
  doc.setFillColor(15, 118, 110); // Teal 700 (#0f766e)
  doc.rect(0, 0, pageWidth, 24, "F");

  // QuickCalc Logo & Text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("QuickCalc", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("free online calculator suite", margin + 32, 13.5);

  // Date Generated
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(9);
  doc.text(`Generated: ${dateStr}`, pageWidth - margin, 14, { align: "right" });

  y = 33;

  // 2. Document Title
  doc.setTextColor(24, 24, 27); // Zinc 900
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`${toolName} - Summary`, margin, y);

  y += 5;
  doc.setDrawColor(228, 228, 231); // Zinc 200
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 8;

  // 3. Inputs Section Box
  if (inputs && inputs.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 118, 110);
    doc.text("INPUT PARAMETERS", margin, y);

    y += 4;

    const rowHeight = 7;
    const boxHeight = Math.ceil(inputs.length / 2) * rowHeight + 6;

    doc.setFillColor(248, 250, 252); // Zinc 50
    doc.setDrawColor(228, 228, 231);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, "FD");

    let inputY = y + 7;
    const col1X = margin + 5;
    const col2X = margin + contentWidth / 2 + 5;

    inputs.forEach((item, index) => {
      const isCol2 = index % 2 === 1;
      const currentX = isCol2 ? col2X : col1X;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(113, 113, 122); // Zinc 500
      doc.text(`${item.label}:`, currentX, inputY);

      const labelWidth = doc.getTextWidth(`${item.label}: `);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(24, 24, 27);
      doc.text(item.value, currentX + labelWidth + 2, inputY);

      if (isCol2 || index === inputs.length - 1) {
        inputY += rowHeight;
      }
    });

    y += boxHeight + 8;
  }

  // 4. Primary Results Section (Highlighted Cards)
  if (results && results.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 118, 110);
    doc.text("CALCULATED RESULTS", margin, y);

    y += 4;

    const cardCount = results.length;
    const cardGap = 4;
    const cardWidth = (contentWidth - cardGap * (Math.min(cardCount, 3) - 1)) / Math.min(cardCount, 3);
    const cardHeight = 22;

    results.forEach((res, idx) => {
      // Calculate row and column if more than 3 cards
      const rIdx = Math.floor(idx / 3);
      const cIdx = idx % 3;

      const cardX = margin + cIdx * (cardWidth + cardGap);
      const cardY = y + rIdx * (cardHeight + cardGap);

      if (res.isHighlight) {
        doc.setFillColor(236, 253, 245); // Emerald 50
        doc.setDrawColor(16, 185, 129); // Emerald 500
      } else {
        doc.setFillColor(244, 244, 245); // Zinc 100
        doc.setDrawColor(212, 212, 216); // Zinc 300
      }

      doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, "FD");

      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(113, 113, 122);
      doc.text(res.label.toUpperCase(), cardX + cardWidth / 2, cardY + 7, { align: "center" });

      // Value
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      if (res.isHighlight) {
        doc.setTextColor(5, 150, 105); // Emerald 600
      } else {
        doc.setTextColor(24, 24, 27);
      }
      doc.text(res.value, cardX + cardWidth / 2, cardY + 16, { align: "center" });
    });

    const rowsCount = Math.ceil(cardCount / 3);
    y += rowsCount * (cardHeight + cardGap) + 6;
  }

  // 5. Summary Note / Paragraph (Optional)
  if (summaryNote) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);

    const splitText = doc.splitTextToSize(summaryNote, contentWidth);
    doc.text(splitText, margin, y);
    y += splitText.length * 4.5 + 6;
  }

  // 6. Data Schedule / Breakdown Table (Optional)
  if (table && table.rows.length > 0) {
    if (y > pageHeight - 60) {
      doc.addPage();
      y = 20;
    }

    if (table.title) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 118, 110);
      doc.text(table.title.toUpperCase(), margin, y);
      y += 5;
    }

    const colCount = table.headers.length;
    const colWidth = contentWidth / colCount;
    const tableRowHeight = 6.5;

    // Header Row
    doc.setFillColor(15, 118, 110);
    doc.rect(margin, y, contentWidth, tableRowHeight, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);

    table.headers.forEach((h, i) => {
      doc.text(h, margin + i * colWidth + colWidth / 2, y + 4.5, { align: "center" });
    });

    y += tableRowHeight;

    // Table Rows (limit to first 25 rows for 1-2 page clean summary if long)
    const maxDisplayRows = Math.min(table.rows.length, 30);
    for (let r = 0; r < maxDisplayRows; r++) {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }

      if (r % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, contentWidth, tableRowHeight, "F");
      }

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(39, 39, 42);

      const rowData = table.rows[r];
      rowData.forEach((val, c) => {
        doc.text(val, margin + c * colWidth + colWidth / 2, y + 4.5, { align: "center" });
      });

      y += tableRowHeight;
    }
  }

  // 7. Footer Attribution
  const footerY = pageHeight - 12;
  doc.setDrawColor(228, 228, 231);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(113, 113, 122);
  doc.text(`Generated at quickcalc.cloud/tools/${toolSlug}`, margin, footerY);
  doc.text("QuickCalc - 100% Free Client-Side Calculators", pageWidth - margin, footerY, {
    align: "right",
  });

  // Download PDF
  const outFilename = filename || `${toolSlug}-summary.pdf`;
  doc.save(outFilename);
}
