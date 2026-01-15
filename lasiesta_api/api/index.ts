import awsLambdaFastify from "@fastify/aws-lambda";
import { buildApp } from "../src/app";

let proxy: ReturnType<typeof awsLambdaFastify>;

export default async function handler(event: any, context: any, callback: any) {
  if (!proxy) {
    const app = await buildApp();
    proxy = awsLambdaFastify(app);
  }

  return proxy(event, context, callback);
}
