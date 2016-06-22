# EC2 Event Slack Notifier

AWS Lambda function to notify [EC2 Scheduled Events](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-instances-status-check_sched.html) to Slack

![image](images/slack.png)

## How to user

TBD

## Development

```bash
# Set AWS credentials
$ export AWS_ACCESS_KEY_ID=awsaccesskeyid
$ export AWS_SECRET_ACCESS_KEY=awssecretaccesskey
$ export AWS_REGION=ap-northeast-1 # or your region

$ npm install

# Start real-time transpilation
$ npm run watch

# Execute Lambda function on local machine
$ npm run local
```

## Author

Daisuke Fujita (@dtan4)

## License

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
