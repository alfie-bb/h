const moment = require('moment');
const chroma = require('chroma-js');
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format(' - h:mmA')
  };
}

module.exports = formatMessage;