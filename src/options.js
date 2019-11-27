const entryOrder = require("./entryOrder.js");
const queryOrder = require("./queryOrder.js");

const getArgsAndCmdRef = function(userOptions) {
  userOptions = userOptions.slice(2);
  let command = userOptions[0];
  let commandRefs = {
    "--save": entryOrder.performSaveCmd,
    "--query": queryOrder.giveQueryResult
  };
  let args = parseUserOptions(userOptions.slice(1));
  return { cmdRef: commandRefs[command], args: args };
};

const getNextElement = function(userOptions, option) {
  let nextElement = userOptions[userOptions.indexOf(option) + 1];
  return nextElement;
};

const parseUserOptions = function(userOptions) {
  const args = {};
  for (let index = 0; index < userOptions.length; index = index + 2) {
    args[userOptions[index].slice(2)] = userOptions[index + 1];
  }
  return args;
};

exports.getArgsAndCmdRef = getArgsAndCmdRef;
exports.parseUserOptions = parseUserOptions;
exports.getNextElement = getNextElement;
