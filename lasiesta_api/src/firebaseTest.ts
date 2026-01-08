import { bucket } from "./lib/firebase";

async function test() {
  const [files] = await bucket.getFiles();
  console.log("✅ Firebase conectado. Arquivos no bucket:", files.length);
}

test().catch(console.error);
