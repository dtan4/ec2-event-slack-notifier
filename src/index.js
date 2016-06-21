import AWS from 'aws-sdk';

exports.handler = (event, context, callback) => {
  let ec2 = new AWS.EC2();
  let describeInstanceStatusPromise = ec2.describeInstanceStatus().promise();

  describeInstanceStatusPromise.then(data => {
    let targets = data.InstanceStatuses.filter(v => v.Events.length > 0);
    callback(null, targets);
  }).catch(err => {
    callback(err);
  });
};
