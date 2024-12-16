import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
// import watermarkImg from "./a.png"; // Main watermark
// import letterHeadImg from "./letter-head.png"; // Letterhead image

const DualImageWatermarkPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const applyWatermark = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF to apply the watermark.");
      return;
    }

    try {
      const pdfReader = new FileReader();

      pdfReader.onload = async () => {
        const pdfBytes = new Uint8Array(pdfReader.result);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Load the main watermark image
        const watermarkResponse = await fetch('./a.png');
        const watermarkBytes = await watermarkResponse.arrayBuffer();
        const watermark = await pdfDoc.embedPng(watermarkBytes);

        // Load the letterhead image
        const letterHeadResponse = await fetch('./c.png');
        const letterHeadBytes = await letterHeadResponse.arrayBuffer();
        const letterHead = await pdfDoc.embedPng(letterHeadBytes);

        // Get dimensions for scaling
        const watermarkDims = watermark.scale(0.8); // Scale down the watermark
        const letterHeadDims = letterHead.scale(0.3); // Adjust scale as needed for letterhead

        const pages = pdfDoc.getPages();

        // Add watermark and letterhead to the first page
        const firstPage = pages[0];
        const { width: firstPageWidth, height: firstPageHeight } = firstPage.getSize();

        // Add letterhead on the first page
        firstPage.drawImage(letterHead, {
          x: firstPageWidth / 2 - letterHeadDims.width / 2,
          y: firstPageHeight - letterHeadDims.height + 100, // 20px margin from the top
          width: letterHeadDims.width,
          height: letterHeadDims.height,
        });

        firstPage.translateContent(0, -50); // Move content 50 units downward

        // Add watermark on the first page
        firstPage.drawImage(watermark, {
          x: firstPageWidth / 2 - watermarkDims.width / 2,
          y: firstPageHeight / 2 - watermarkDims.height / 2,
          width: watermarkDims.width,
          height: watermarkDims.height,
          opacity: 0.3,
        });

        // Add watermark to all remaining pages
        for (let i = 1; i < pages.length; i++) {
          const page = pages[i];
          const { width, height } = page.getSize();

          page.drawImage(watermark, {
            x: width / 2 - watermarkDims.width / 2,
            y: height / 2 - watermarkDims.height / 2,
            width: watermarkDims.width,
            height: watermarkDims.height,
            opacity: 0.3,
          });
        }

        const pdfDataUri = await pdfDoc.save();
        const blob = new Blob([pdfDataUri], { type: "application/pdf" });
        saveAs(blob, "watermarked_with_dual_images.pdf");
      };

      pdfReader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error("Error applying watermark:", error);
      alert("An error occurred while processing the PDF.");
    }
  };
  const applyWatermark1 = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF to apply the watermark.");
      return;
    }

    try {
      const pdfReader = new FileReader();

      pdfReader.onload = async () => {
        const pdfBytes = new Uint8Array(pdfReader.result);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Fetch the image from the source
        const imageResponse = await fetch('./a.png');
        const imageBytes = await imageResponse.arrayBuffer();
        const image = await pdfDoc.embedPng(imageBytes); // Embed PNG, or use `embedJpg` for JPG

        const imageDims = image.scale(0.8); // Scale down the image
        const pages = pdfDoc.getPages();

        for (const page of pages) {
          const { width, height } = page.getSize();

          page.drawImage(image, {
            x: width / 2 - imageDims.width / 2,
            y: height / 2 - imageDims.height / 2,
            width: imageDims.width,
            height: imageDims.height,
            opacity: 0.3, // Transparency for watermark
          });
        }

        const pdfDataUri = await pdfDoc.save();
        const blob = new Blob([pdfDataUri], { type: "application/pdf" });
        saveAs(blob, "watermarked_with_image.pdf");
      };

      pdfReader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error("Error applying watermark:", error);
      alert("An error occurred while processing the PDF.");
    }
  };
  return (
    <>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Watermark+Letterhead</h2>
      <div>
        <label>
          Upload PDF:{" "}
          <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        </label>
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={applyWatermark}
      >
        Apply Watermark
      </button>
    </div>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2>Only Watermark</h2>
    <div>
      <label>
        Upload PDF:{" "}
        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
      </label>
    </div>
    <button
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={applyWatermark1}
    >
      Apply Watermark
    </button>
  </div>
  </>
  );
};

export default DualImageWatermarkPDF;
