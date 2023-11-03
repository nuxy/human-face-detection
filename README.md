# human-face-detection

![git Version](https://img.shields.io/github/package-json/v/nuxy/human-face-detection?style=flat-square&svg=true&label=git+package) [![Build Status](https://api.travis-ci.com/nuxy/human-face-detection.svg?branch=master)](https://app.travis-ci.com/github/nuxy/human-face-detection)

AWS [CloudFront Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) / [TensorFlow](https://www.tensorflow.org) face detection via [Human](https://github.com/vladmandic/human)

## Features

- Facial biometrics data that include age, gender, and emotion.
- Serverless function, scales [on a tight budget](https://s3.amazonaws.com/lambda-tools/pricing-calculator.html).
- Can be set-up easily (in minutes).

## Dependencies

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org)

## Deploying to AWS

    $ ./deploy --profile <AWS credentials profile>

The following operations are orchestrated by AWS [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) during execution:

- Docker container image is created and uploaded to AWS [Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html).
- AWS [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) function is created with a configured [Function URL](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html) endpoint.
- AWS [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) distribution is created using the new function as origin.
- Network routing occurs thereby exposing your Lambda function URL

## Invoking the service

### Command-line

```sh
curl -X 'POST' \
  'https://<url-id>.lambda-url.<region>.on.aws/' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"file": "<base64-image>"}'
```

### In Node.js

```js
const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({region: '<region>'});

const params = {
  FunctionName: 'HumanFaceApi',
  InvocationType: 'RequestResponse',
  LogType: 'Tail',
  Payload: JSON.stringify({file: '<base64-image>'})
};

lambda.invoke(params).promise()
  .then(function({Payload}) {
    const data = JSON.parse(Payload);

    console.log(data?.body?.faces));
  })
  .catch(function(err) {
    console.warn(err.message);
    throw err;
  });
```

## Environment variables

The following function environment overrides can be configured in the SAM [template](https://github.com/nuxy/human-face-detection/blob/master/template.yaml#L23) file:

| Variable name      | Description          | Default value |
|--------------------|----------------------|---------------|
| `HUMAN_DEBUG`      | Enable verbose logging to [CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) group | false |
| `HUMAN_MODELS_DIR` | Relative path to your [custom models](https://github.com/vladmandic/human/wiki/Models) directory | [node_modules/@vladmandic/human/models](https://github.com/vladmandic/human/tree/main/models) |

## AWS requirements

In order to successfully deploy your application you must have [set-up your AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/gs-cli.html) and have [created an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with the following [policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html):

- [IAMFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FIAMFullAccess)
- [CloudFrontFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FCloudFrontFullAccess)
- [AWSCloudFormationFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAWSCloudFormationFullAccess)
- [AWSLambda_FullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAWSLambda_FullAccess)
- [AmazonEC2ContainerRegistryFullAccess](https://us-east-1.console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess)

WARNING: The policies above are provided to ensure a successful application deployment.  It is recommended that you adjust these policies to meet the security requirements of your Lambda application.  They should NOT be used in a Production environment.

## Developers

### CLI options

Starting up a local instance using [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html):

    $ sam local start-api

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Generate [Swagger](https://swagger.io) OpenAPI definitions:

    $ npm run genapi

Run [Mocha](https://mochajs.org) unit tests:

    $ npm run test

## Performance

Running in Lambda there is overhead that occurs ([cold start](https://docs.aws.amazon.com/lambda/latest/operatorguide/execution-environments.html)) when the environment is first launched.  This overhead does not include [TensorFlow](https://github.com/tensorflow/tfjs) initialization (model loading) which creates its own latency.  Due to this, you can expect a longer response time for the first request.  As long as there is an active Lambda handler (hot start) all subsequent requests will not incurr this overhead.

## References

- [Setting IAM Permissions and Roles](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html)
- [Scaling and concurrency in Lambda](https://docs.aws.amazon.com/lambda/latest/operatorguide/scaling-concurrency.html)
- [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html)

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_human-face-detection_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

[AWS](https://aws.amazon.com) is a registered trademark of Amazon Web Services, Inc.

## Author

[Marc S. Brooks](https://github.com/nuxy)
