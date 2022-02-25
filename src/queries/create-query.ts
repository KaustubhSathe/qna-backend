import * as uuid from "uuid";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";

const dynamoDB = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
