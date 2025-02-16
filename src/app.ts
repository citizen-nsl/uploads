import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import path from 'path';
import fs from 'fs';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });

// กำหนดประเภทของไฟล์ที่อัปโหลด
interface FileData {
  filename: string;
  file: NodeJS.ReadableStream;
}

// ลงทะเบียน plugin ต่างๆ
app.register(cors);
app.register(fastifyMultipart);
app.register(fastifyStatic, { root: path.join(__dirname, 'uploads') });

// สร้างโฟลเดอร์สำหรับเก็บไฟล์
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// API สำหรับอัปโหลดไฟล์
app.post('/upload', async (req: FastifyRequest, reply: FastifyReply) => {
  const data = await req.file() as FileData; // ระบุชนิดของข้อมูล
  const filename = `${Date.now()}-${data.filename}`;
  const filePath = path.join(uploadDir, filename);

  await new Promise<void>((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    data.file.pipe(writeStream);
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  reply.send({
    message: 'File uploaded successfully',
    fileUrl: `http://localhost:3000/${filename}`,
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen({ port: 3000 }, () => {
  console.log('🚀 Fastify server running on http://localhost:3000');
});
