import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdfFromHtml = async () => {
    const element = document.getElementById("exercise-list"); // ID do elemento a capturar

    if (!element) {
        console.error("Elemento não encontrado");
        return;
    }

    try {
        // Captura o conteúdo como canvas
        const canvas = await html2canvas(element, { scale: 2 }); // Aumenta a resolução
        const imgData = canvas.toDataURL("image/png");

        // Cria o PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("treino.pdf");
    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
    }
};