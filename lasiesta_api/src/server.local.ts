// src/server.ts
import app from "./app";

async function start() {
  await app.listen({ port: 3333, host: "0.0.0.0" });
  console.log("🚀 API running on http://localhost:3333");
}

start();
