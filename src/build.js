import { exec } from 'child_process';
import Package from '../package';

function exclude_path(key) {
  return `node_modules/${key}\\*`
}

function exclude_paths() {
  return Object.keys(Package.devDependencies).map(key => exclude_path(key)).join(' ');
}

var command = `zip -r dist/ec2-event-slack-notifier.zip env.js index.js node_modules -x ${exclude_paths()}`

exec(command, { maxBuffer: 400 * 1024 }, (err, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);

  if (err != null) {
    console.log(`exec error: ${err}`);
  }
});
