# human-face-detection

![git Version](https://img.shields.io/github/package-json/v/nuxy/human-face-detection?style=flat-square&svg=true&label=git+package) [![Build Status](https://api.travis-ci.com/nuxy/human-face-detection.svg?branch=master)](https://app.travis-ci.com/github/nuxy/human-face-detection)

AWS [CloudFront Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) / [TensorFlow](https://www.tensorflow.org) face detection.

## Features

- Facial biometrics data that include age, gender, and emotion.
- Serverless function, scales [on a tight budget](https://s3.amazonaws.com/lambda-tools/pricing-calculator.html).
- Can be set-up easily (in minutes).

## Dependencies

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org)

## Deploying to AWS

    $ ./deploy --profile <AWS credentials profile>

## Invoking the service

### Command-line

```sh
curl -X 'POST' \
  'https://<url-id>.lambda-url.<region>.on.aws/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "file": "<base64-image>"
}'
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

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Generate [Swagger](https://swagger.io) OpenAPI definitions:

    $ npm run genapi

Run [Mocha](https://mochajs.org) unit tests:

    $ npm run test

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
