import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios";
import * as config from "../config/stage.json";
import { redisClient } from "../utils/redis";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const res = await redisClient.get("hello");
  console.log(res);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(res),
  };
};
