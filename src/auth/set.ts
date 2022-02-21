import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios";
import * as config from "../config/stage.json";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "set data successfully!",
    }),
  };
};
