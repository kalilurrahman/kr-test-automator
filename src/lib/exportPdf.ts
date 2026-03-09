import jsPDF from "jspdf";

interface ExportData {
  title: string;
  platform: string;
  framework: string;
  language: string;
  script: string;
  test_cases?: { id: string; name: string; type: string; priority: string; description: string }[];
  prerequisites?: string[] | null;
  coverage_notes?: string | null;
  known_limitations?: string[] | null;
}

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android",
};

export function exportToPdf(data: ExportData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  const addPage = () => { doc.addPage(); y = 20; };
  const checkPage = (needed: number) => { if (y + needed > 270) addPage(); };

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(data.title, margin, y);
  y += 10;

  // Meta
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Platform: ${platformLabels[data.platform] || data.platform}  |  Framework: ${data.framework}  |  Language: ${data.language}`, margin, y);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y + 5);
  y += 15;
  doc.setTextColor(0);

  // Divider
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Test Cases
  if (data.test_cases && data.test_cases.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Test Cases", margin, y);
    y += 8;

    doc.setFontSize(9);
    data.test_cases.forEach((tc) => {
      checkPage(15);
      doc.setFont("helvetica", "bold");
      doc.text(`${tc.id} - ${tc.name}`, margin, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(`Type: ${tc.type}  |  Priority: ${tc.priority}`, margin + 4, y);
      y += 4;
      const descLines = doc.splitTextToSize(tc.description, maxWidth - 8);
      doc.text(descLines, margin + 4, y);
      y += descLines.length * 4 + 4;
      doc.setTextColor(0);
    });
    y += 5;
  }

  // Prerequisites
  if (data.prerequisites?.length) {
    checkPage(20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Prerequisites", margin, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    data.prerequisites.forEach((p) => {
      checkPage(8);
      doc.text(`• ${p}`, margin + 4, y);
      y += 5;
    });
    y += 5;
  }

  // Coverage Notes
  if (data.coverage_notes) {
    checkPage(20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Coverage Notes", margin, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(data.coverage_notes, maxWidth);
    doc.text(lines, margin, y);
    y += lines.length * 4 + 5;
  }

  // Known Limitations
  if (data.known_limitations?.length) {
    checkPage(20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Known Limitations", margin, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    data.known_limitations.forEach((l) => {
      checkPage(8);
      doc.text(`• ${l}`, margin + 4, y);
      y += 5;
    });
    y += 5;
  }

  // Script Code
  checkPage(20);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Test Script", margin, y);
  y += 8;

  doc.setFontSize(7);
  doc.setFont("courier", "normal");
  const codeLines = doc.splitTextToSize(data.script, maxWidth);
  codeLines.forEach((line: string) => {
    checkPage(5);
    doc.text(line, margin, y);
    y += 3.5;
  });

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150);
    doc.text(`TestForge AI  •  Page ${i} of ${totalPages}`, margin, 285);
    doc.setTextColor(0);
  }

  doc.save(`${data.title.toLowerCase().replace(/\s+/g, "-")}-test-plan.pdf`);
}
