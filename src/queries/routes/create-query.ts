import AWS from "aws-sdk";
import * as uuid from "uuid";
import { TABLE_NAME } from "../../constants/constants";
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
  console.log(typeof event);
  const data = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      PK: "QUERY#" + uuid.v4(),
      SK: "QUERY#" + uuid.v4(),
      content: data.content,
      created_at: Date.now(),
    },
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
}
