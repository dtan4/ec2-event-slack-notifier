'use strict';

let AWS = require('aws-sdk');
let RP = require('request-promise');

function constructAttachments(statuses, locale) {
  let now = new Date();

  return statuses.map(status => {
    return status.Events.map(event => {
      let color = event.NotBefore > now ? 'warning' : 'danger';
      let eventFrom = event.NotBefore == undefined ? '' : event.NotBefore.toLocaleString(locale, { hour12: false });
      let eventTo = event.NotAfter == undefined ? '' : event.NotAfter.toLocaleString(locale, { hour12: false });

      return {
        fallback: `${status.InstanceId} / ${event.Code} / ${eventFrom} - ${eventTo} / ${event.Description}`,
        color: color,
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

exports.handler = (event, context, callback) => {
  let locale = process.env.LOCALE;          // e.g. ja-JP
  let timezone = process.env.TIMEZONE;      // e.g. Asia/Tokyo
  let webHookURL = process.env.WEBHOOK_URL;

  if (!process.env.TZ && timezone != '') {
    process.env.TZ = timezone;
  }

  let ec2 = new AWS.EC2();
  let describeInstanceStatusPromise = ec2.describeInstanceStatus().promise();

  describeInstanceStatusPromise.then(data => {
    let statuses = data.InstanceStatuses.filter(v => v.Events.length > 0);
    let attachments = constructAttachments(statuses, locale);

    if (attachments.length == 0) {
      return {};
    }

    let message = {
      text: ':warning: There are some EC2 Scheduled Events. :warning:',
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
