'use strict';

let assert = require('assert');
let index = require('../index');

describe('constructAttachments', () => {
  let statuses = [
    {
      AvailabilityZone: 'ap-northeast-1b',
      Events: [],
      InstanceId: 'i-1234567890abcdef1',
      InstanceState: {
        Code: 16,
        Name: 'running',
      },
      InstanceStatus: {
        Details: [
          {
            Name: 'reachability',
            Status: 'passed',
          },
        ],
        Status: 'ok',
      },
      SystemStatus: {
        Details: [
          {
            Name: 'reachability',
            Status: 'passed',
          },
        ],
        Status: 'ok',
      },
    },
    {
      AvailabilityZone: 'ap-northeast-1c',
      Events: [
        {
          Code: 'instance-stop',
          Description: 'The instance is running on degraded hardware',
          NotBefore: new Date(2017, 8, 10, 17, 25, 52),
        }
      ],
      InstanceId: 'i-1fedcba0987654321',
      InstanceState: {
        Code: 16,
        Name: 'running',
      },
      InstanceStatus: {
        Details: [
          {
            Name: 'reachability',
            Status: 'passed',
          },
        ],
        Status: 'ok',
      },
      SystemStatus: {
        Details: [
          {
            Name: 'reachability',
            Status: 'passed',
          },
        ],
        Status: 'ok',
      },
    },
  ]
  let now = new Date(2017, 8, 1, 12, 34, 56);
  let locale = 'ja-JP';

  it('should return attachments', () => {
    let expected = [
      {
        fallback: 'i-1fedcba0987654321 / instance-stop / 2017-09-10 17:25:52 -  / The instance is running on degraded hardware',
        color: 'warning',
        fields: [
          {
            title: 'Instance',
            value: 'i-1fedcba0987654321',
            short: true,
          },
          {
            title: 'Event Type',
            value: 'instance-stop',
            short: true,
          },
          {
            title: 'Duration',
            value: `2017-09-10 17:25:52 - `,
            short: false,
          },
          {
            title: 'Description',
            value: 'The instance is running on degraded hardware',
            short: false,
          },
        ],
      }
    ]

    let attachments = index.constructAttachments(statuses, now, locale);
    assert.deepEqual(attachments, expected)
  });
});
