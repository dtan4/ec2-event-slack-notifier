# EC2 Event Slack Notifier

[![Build Status](https://travis-ci.org/dtan4/ec2-event-slack-notifier.svg?branch=master)](https://travis-ci.org/dtan4/ec2-event-slack-notifier)

AWS Lambda function to notify [EC2 Scheduled Events](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-instances-status-check_sched.html) to Slack

![image](images/slack.png)

## Install

At first, set AWS credentials as environment variables:

```bash
# Set AWS credentials
$ export AWS_ACCESS_KEY_ID=awsaccesskeyid
$ export AWS_SECRET_ACCESS_KEY=awssecretaccesskey
$ export AWS_REGION=ap-northeast-1 # or your region
```

You can install this function as [Serverless](https://serverless.com/) function, a part of [Apex](http://apex.run/) project, or standalone function.

### 1. Serverless function

```sh-session
$ git clone https://github.com/dtan4/ec2-event-slack-notifier.git
$ cd ec2-event-slack-notifier
$ yarn
$ cp serverless.yml.example serverless.yml
$ vim serverless.yml
$ npm run deploy
```

### 2. Apex project

Add ec2-event-slack-notifier to your Apex project:

```bash
$ git submodule add https://github.com/dtan4/ec2-event-slack-notifier.git functions/ec2-event-slack-notifier
```

Deploy it:

```bash
$ apex deploy ec2-event-slack-notifier
```

### 3. Standalone

Preparing... :construction_worker:

## Author

Daisuke Fujita (@dtan4)

## License

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
