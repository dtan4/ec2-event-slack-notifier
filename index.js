'use strict';

let AWS = require('aws-sdk');
let RP = require('request-promise');
let slack = require('./slack.js');

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
    let attachments = slack.constructAttachments(statuses, locale);

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

exports.handler(null, null, (err, msg) => { console.log(err ? err : msg); });
