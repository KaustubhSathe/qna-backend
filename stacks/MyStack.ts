import * as sst from "@serverless-stack/resources";

// const GOOGLE_CLIENT_ID =
//   "867207334312-7c5ggb9ejhbbct6i07pc0nid7venog7e.apps.googleusercontent.com";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);
    const TABLE_NAME = "stage-Master";
    console.log(TABLE_NAME);
    // Create DynamoDB table
    const table = new sst.Table(this, TABLE_NAME, {
      fields: {
        PK: sst.TableFieldType.STRING,
        SK: sst.TableFieldType.STRING,
      },
      primaryIndex: {
        partitionKey: "PK",
        sortKey: "SK",
      },
    });

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          tableName: table.dynamodbTable.tableName,
        },
      },
      routes: {
        "POST /query/create": "src/queries/routes/create-query.handler",
        // "GET /query/get" : "src/queries/routes/get-query.handler",
        // "PUT /query/update": "src/queries/update-query.handler",
        // "DELETE /query/delete": "src/queries/delete-query.handler"
      },
    });

    api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
