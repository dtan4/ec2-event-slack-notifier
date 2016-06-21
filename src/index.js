import AWS from 'aws-sdk';

function constructAttachments(statuses) {
  return statuses.map(status => {
    return status.Events.map(event => {
      var eventFrom = event.NotBefore.toLocaleString('ja-JP', { hour12: false });
      var eventTo = event.NotBefore.toLocaleString('ja-JP', { hour12: false });

      return {
        fallback: `${status.InstanceId} / ${event.Code} / ${eventFrom} - ${eventTo} / ${event.Description}`,
        color: 'warning',
        fields: [
          {
            title: 'Instance',
            value: status.InstanceId,
            short: true,
          },
          {
            title: 'Event Type',
            value: event.Code,
            short: true,
          },
          {
            title: 'Duration',
            value: `${eventFrom} - ${eventTo}`,
            short: false,
          },
          {
            title: 'Description',
            value: event.Description,
            short: false,
          },
        ],
      };
    }).reduce((r, v) => r.concat(v));
  });
}

exports.handler = (event, context, callback) => {
  let ec2 = new AWS.EC2();
  let describeInstanceStatusPromise = ec2.describeInstanceStatus().promise();

  describeInstanceStatusPromise.then(data => {
    let statuses = data.InstanceStatuses.filter(v => v.Events.length > 0);
    let attachments = constructAttachments(statuses);

    console.log(attachments.length);

    if (attachments.length == 0) {
      return {};
    }

    let message = {
      text: 'There are some EC2 Scheduled Events.',
      attachments: attachments,
    };

    return message;
  }).then(data => {
    callback(null, data);
  }).catch(err => {
    callback(err);
  });
};
