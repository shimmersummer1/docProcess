import express from 'express';
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';
import cors from 'cors';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post('/merge', upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) {
      return res.status(400).json({ error: '请上传至少两个PDF文件' });
    }

    // 创建一个新的 PDF 文档
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdf = await PDFDocument.load(file.buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="merged.pdf"',
    });
    res.send(Buffer.from(mergedPdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'PDF合并失败' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`PDF合并服务已启动，端口：${PORT}`);
}); 