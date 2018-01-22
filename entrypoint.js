let index = require('./index.js');

index.handler({}, null, (error, result) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(result);
});
