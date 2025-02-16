# Fastify File Upload Server

โปรเจคนี้เป็นเซิร์ฟเวอร์สำหรับอัปโหลดไฟล์ที่สร้างด้วย [Fastify](https://www.fastify.io/), รองรับการอัปโหลดไฟล์สูงสุด 30MB, เก็บไฟล์ในโฟลเดอร์ภายใน และสามารถเข้าถึงไฟล์เหล่านั้นผ่าน URL แบบสแตติก พร้อมทั้งรองรับการใช้งาน CORS และการจัดการฟอร์มแบบ multipart

## ฟีเจอร์

- **การอัปโหลดไฟล์**: อัปโหลดไฟล์ผ่านคำขอแบบ POST
- **การดาวน์โหลดไฟล์**: ดาวน์โหลดไฟล์ที่อัปโหลดผ่าน URL
- **รองรับ CORS**: เปิดใช้งาน CORS เพื่อความยืดหยุ่นในการเข้าถึงเซิร์ฟเวอร์จากโดเมนต่างๆ
- **การให้บริการไฟล์สแตติก**: เซิร์ฟเวอร์ให้บริการไฟล์จากโฟลเดอร์ `uploads`
- **ข้อจำกัดขนาดไฟล์**: เซิร์ฟเวอร์รองรับไฟล์ขนาดสูงสุด 30MB

## เทคโนโลยีที่ใช้

- [Fastify](https://www.fastify.io/) - เว็บเฟรมเวิร์กสำหรับ Node.js
- [fastify-multipart](https://github.com/fastify/fastify-multipart) - ปลั๊กอินของ Fastify สำหรับการจัดการ multipart/form-data (การอัปโหลดไฟล์)
- [fastify-static](https://github.com/fastify/fastify-static) - ปลั๊กอินของ Fastify สำหรับการให้บริการไฟล์สแตติก
- [fastify-cors](https://github.com/fastify/fastify-cors) - ปลั๊กอินของ Fastify สำหรับเปิดใช้งาน CORS
- Node.js
- TypeScript

## การติดตั้ง

### ข้อกำหนดเบื้องต้น

- [Node.js](https://nodejs.org/en/) (เวอร์ชั่น 14.x หรือสูงกว่า)
- [npm](https://www.npmjs.com/) หรือ [yarn](https://yarnpkg.com/)

### ขั้นตอน

1. โคลนโปรเจค:

   ```bash
   git clone https://github.com/yourusername/uploads.git
   cd uploads
   ```
2. ติดตั้ง dependencies:
  ```bash
  npm install
  # หรือ
  yarn install
  ```
3. (ออปชั่น) คอมไพล์ TypeScript เป็น JavaScript:
  ```bash
  npx tsc
  ```

4. เริ่มเซิร์ฟเวอร์:
  ```bash
  npm start
  # หรือ
  yarn start
  ```

5. เซิร์ฟเวอร์จะเริ่มทำงานที่ http://localhost:3000


## API Endpoints

# 1. POST ``/upload``
### คำอธิบาย:
อัปโหลดไฟล์ไปยังเซิร์ฟเวอร์

## การร้องขอ:
- Method: POST
- Content-Type: multipart/form-data
- Fields: ฟิลด์ไฟล์ที่มีคีย์ว่า file
## ตัวอย่างการร้องขอ:
```bash
curl -X POST http://localhost:3000/upload \
  -F "file=@/path/to/your/file.jpg"
``

## การตอบกลับ:
- Status: 200 OK
- Body: {
  "message": "File uploaded successfully",
  "fileUrl": "http://localhost:3000/your-file-name"
}
