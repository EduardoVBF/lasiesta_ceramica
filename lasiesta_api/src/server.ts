import awsLambdaFastify from "@fastify/aws-lambda";
import app from "./app";

const handler = awsLambdaFastify(app);

export default async function vercelHandler(req: any, res: any) {
  // garante que plugins e rotas estejam prontos no cold start
  if (!app.ready) {
    await app.ready();
  }

  return handler(req, res);
}
