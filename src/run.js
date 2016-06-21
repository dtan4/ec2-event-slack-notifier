import Index from './index.js';

var event = {};
var context = {};
var callback = (error, message) => {
  if (error) {
    console.log('ERROR!');
    console.log(error);
  } else {
    console.log('SUCCESS!');
    console.log(message);
  }
};

Index.handler(event, context, callback);
