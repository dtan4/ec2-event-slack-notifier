import Index from './index.js';

const event = {};

const context = {
  succeed: (result) => {
    console.log('SUCCESS!');
    console.log(result);
    process.exit(0);
  },
  fail: (error) => {
    console.log('ERROR!');
    console.log(error);
    process.exit(1);
  },
  done: (err, res) => err ? fail(err) : succeed(res),
  getRemainingTimeInMillis: () => Infinity,
  functionName: "fakeLambda",
  functionVersion: "0",
  invokedFunctionArn: "arn:aws:lambda:fake-region:fake-acc:function:fakeLambda",
  memoryLimitInMB: Infinity,
  awsRequestId: "fakeRequest",
  logGroupName: "fakeGroup",
  logStreamName: "fakeStream",
  identity: null,
  clientContext: null
};

const callback = (error, message) => {
  if (error) {
    console.log('ERROR!');
    console.log(error);
    process.exit(1);
  } else {
    console.log('SUCCESS!');
    console.log(message);
    process.exit(0);
  }
};

Index.handler(event, context, callback);
