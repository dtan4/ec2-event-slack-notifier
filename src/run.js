import Index from './index.js';

function succeed(result) {
  console.log('SUCCESS!');
  console.log(result);
  process.exit(0);
}

function fail(error) {
  console.log('ERROR!');
  console.log(error);
  process.exit(1);
}

const event = {};

const context = {
  succeed: succeed,
  fail: fail,
  done: (err, res) => err ? fail(err) : succeed(res),
  getRemainingTimeInMillis: () => Infinity,
  functionName: 'fakeLambda',
  functionVersion: '0',
  invokedFunctionArn: 'arn:aws:lambda:fake-region:fake-acc:function:fakeLambda',
  memoryLimitInMB: Infinity,
  awsRequestId: 'fakeRequest',
  logGroupName: 'fakeGroup',
  logStreamName: 'fakeStream',
  identity: null,
  clientContext: null
};

const callback = (error, message) => {
  if (error) {
    fail(error);
  } else {
    succeed(message);
  }
};

Index.handler(event, context, callback);
