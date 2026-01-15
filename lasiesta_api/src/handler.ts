import awsLambdaFastify from "@fastify/aws-lambda";
import { buildApp } from "./app";

let proxy: ReturnType<typeof awsLambdaFastify> | null = null;

export default async function handler(
  event: any,
  context: any,
  callback: any
) {
  if (!proxy) {
    const app = await buildApp();
    proxy = awsLambdaFastify(app);
  }

  return proxy(event, context, callback);
}
