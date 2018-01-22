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

You can install this function as...

- [Serverless](https://serverless.com/) function
- a part of [Apex](http://apex.run/) project
- standalone function
- Kubernetes CronJob

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

### 4. Kubernetes CronJob

Set these Secrets:

|name|key|description|
|----|---|-----------|
|`dotenv`|`AWS_ACCESS_KEY_ID`|AWS access key ID|
|`dotenv`|`AWS_SECRET_ACCESS_KEY`|AWS secret access key|
|`dotenv`|`AWS_REGION`|AWS region|
|`dotenv`|`WEBHOOK_URL`|Slack webhook URL|
|`dotenv`|`TZ`|timezone ([tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) zone name) e.g., `Asia/Tokyo`|

deploy CronJob resource:

```bash
kubectl create -f kubernetest/cronjob.yaml [-n NAMESPACE]
```

`ec2-event-slack-notifier` Job will be invoked at 0:30 GMT in default.

## Author

Daisuke Fujita (@dtan4)

## License

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
