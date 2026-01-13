import jsPDF from "jspdf";

export function generatePDF(results, currency, userInput) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const marginX = 10;
  const marginTop = 15;

  const pageHeight = doc.internal.pageSize.getHeight();

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Header
  doc.setFontSize(20);
  doc.text("Investment Report", marginX, marginTop);

  doc.setFontSize(12);
  let y = marginTop + 12;

  // Summary
  doc.text(`Beginning Investment: ${formatter.format(Number(userInput.initialInvestment) || 0)}`, marginX, y); y += 8;
  doc.text(`Annual Investment: ${formatter.format(Number(userInput.annualInvestment) || 0)}`, marginX, y); y += 8;
  doc.text(`Return on Investment: ${Number(userInput.expectedReturn) || 0}%`, marginX, y); y += 8;
  doc.text(`Years of Investment: ${Number(userInput.duration) || 0}`, marginX, y); y += 12;

  const lineSpacing = 7;
  const blockHeight = lineSpacing * 5 + 6; // 5 lines + a bit of padding

  results.forEach((result) => {
    // Page break before writing the block
    if (y + blockHeight > pageHeight - 10) {
      doc.addPage();
      y = 20;
    }

    doc.text(`Year: ${result.year}`, marginX, y); y += lineSpacing;
    doc.text(`Interest (Year): ${formatter.format(Number(result.interest) || 0)}`, marginX, y); y += lineSpacing;
    doc.text(`Interest (Total): ${formatter.format(Number(result.totalInterest) || 0)}`, marginX, y); y += lineSpacing;
    doc.text(`Invested Capital: ${formatter.format(Number(result.investedCapital) || 0)}`, marginX, y); y += lineSpacing;
    doc.text(`Total Investment Value: ${formatter.format(Number(result.investmentValue) || 0)}`, marginX, y); y += (lineSpacing + 6);
  });

  doc.save("Investment Report.pdf");
}
