import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios";
import * as config from "./config/stage.json";
const DEV_ENDPOINT = config.endpoint;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const res = await axios.get(DEV_ENDPOINT + "/public2");
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(res.data),
  };
};
