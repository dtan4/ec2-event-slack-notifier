import { exec } from 'child_process';
import Package from '../package';

function excludePath(key) {
  return `node_modules/${key}\\*`;
}

function excludePaths() {
  return Object.keys(Package.devDependencies).map(key => excludePath(key)).join(' ');
}

var command = `zip -r dist/ec2-event-slack-notifier.zip env.js index.js node_modules -x ${excludePaths()}`;

exec(command, { maxBuffer: 400 * 1024 }, (err, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);

  if (err != null) {
    console.log(`exec error: ${err}`);
  }
});
