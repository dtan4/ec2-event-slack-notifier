import AWS from 'aws-sdk';
import RP from 'request-promise';
import { locale, timezone, webHookURL } from './env';

function constructAttachments(statuses) {
  var now = new Date();

  return statuses.map(status => {
    return status.Events.filter(e => e.NotAfter > now).map(event => {
      var color;

      if (event.NotBefore > now) {
        color = 'warning';
      } else {
        color = 'danger';
      }

      var eventFrom = event.NotBefore.toLocaleString(locale, { hour12: false });
      var eventTo = event.NotAfter.toLocaleString(locale, { hour12: false });

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
    });
  }).filter(a => a.length > 0).reduce((r, v) => r.concat(v), []);
}

if (timezone != '') {
  process.env.TZ = timezone;
}

exports.handler = (event, context, callback) => {
  let ec2 = new AWS.EC2();
  let describeInstanceStatusPromise = ec2.describeInstanceStatus().promise();

  describeInstanceStatusPromise.then(data => {
    let statuses = data.InstanceStatuses.filter(v => v.Events.length > 0);
    let attachments = constructAttachments(statuses);

    if (attachments.length == 0) {
      return {};
    }

    let message = {
      text: 'There are some EC2 Scheduled Events.',
      attachments: attachments,
    };

    let options = {
      method: 'POST',
      uri: webHookURL,
      body: message,
      json: true,
    };

    return RP(options);
  }).then(data => {
    callback(null, data);
  }).catch(err => {
    callback(err);
  });
};
