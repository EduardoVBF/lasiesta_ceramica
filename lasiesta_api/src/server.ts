import 'dotenv/config';
import { buildApp } from './app';

const app = buildApp();

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT }, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
