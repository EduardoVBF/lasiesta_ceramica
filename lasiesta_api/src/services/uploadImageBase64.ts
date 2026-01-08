import { bucket } from "../lib/firebase";
import { randomUUID } from "crypto";

export async function uploadBase64ToFirebase(
  base64: string,
  folder: string
): Promise<string> {
  // 1️⃣ Extrair mime e conteúdo
  const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);

  if (!matches) {
    throw new Error("Imagem base64 inválida");
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  // 2️⃣ Converter para buffer
  const buffer = Buffer.from(base64Data, "base64");

  // 3️⃣ Nome do arquivo
  const fileName = `${folder}/${randomUUID()}`;

  const file = bucket.file(fileName);

  // 4️⃣ Upload
  await file.save(buffer, {
    metadata: {
      contentType: mimeType,
    },
  });

  // 5️⃣ Tornar público
  await file.makePublic();

  // 6️⃣ Retornar URL
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}
