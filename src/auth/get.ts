import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios";
import * as config from "../config/stage.json";
import redis from "redis";

const redisClient = redis.createClient({
  host: "us1-open-boxer-36065.upstash.io",
  port: "36065",
  password: "358575802b8d47ad95538da545735169",
});

redisClient.on("error", function (err) {
  throw err;
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const res = redisClient.get("hello");
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(res),
  };
};
