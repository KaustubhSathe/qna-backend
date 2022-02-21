import * as sst from "@serverless-stack/resources";

const GOOGLE_CLIENT_ID = "867207334312-7c5ggb9ejhbbct6i07pc0nid7venog7e.apps.googleusercontent.com";

export default class AuthStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        "GET /public" : {
          function: "src/public.handler",
          authorizationType: sst.ApiAuthorizationType.NONE,
        },
        "GET /public2" : {
          function: "src/public2.handler",
          authorizationType: sst.ApiAuthorizationType.NONE,
        }
      },
    });

    const auth = new sst.Auth(this, "Auth", {
      google: {
        clientId : GOOGLE_CLIENT_ID
      }
    });

    auth.attachPermissionsForAuthUsers([api]);

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
      "IdentityPoolId" : auth.cognitoCfnIdentityPool.ref,
    });
  }
}
