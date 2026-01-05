import 'dotenv/config';
import { buildApp } from './app';

async function start() {
  const app = await buildApp();

  const PORT = Number(process.env.PORT) || 3333;

  app.listen({ port: PORT }, () => {
    console.log(`🚀 API running on port ${PORT}`);
  });
}

start();