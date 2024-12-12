import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdfFromHtml = async () => {
    const element = document.getElementById("exercise-list");

    if (!element) {
        console.error("Elemento não encontrado");
        return;
    }

    try {
        // Clona o elemento
        const clonedElement = element.cloneNode(true) as HTMLElement;

        // Remove botões de ações do clone
        const buttons = clonedElement.querySelectorAll(".action-button");
        buttons.forEach(button => button.remove());

        // Adiciona o clone ao DOM para captura (invisível)
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.top = "-9999px";
        tempDiv.appendChild(clonedElement);
        document.body.appendChild(tempDiv);

        // Captura o clone como canvas
        const canvas = await html2canvas(clonedElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // Remove o clone temporário do DOM
        document.body.removeChild(tempDiv);

        // Gera o PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("treino.pdf");
    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
    }
};