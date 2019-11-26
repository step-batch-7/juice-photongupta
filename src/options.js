const entryOrder = require("./entryOrder.js");
const queryOrder = require("./queryOrder.js");

const getCmdRef = function(userOptions) {
  let command = userOptions[0];
  let commandRefs = {
    "--save": entryOrder.updateTransaction,
    "--query": queryOrder.giveQueryResult
  };
  return commandRefs[command];
};

const getNextElement = function(userOptions, option) {
  let nextElement = userOptions[userOptions.indexOf(option) + 1];
  return nextElement;
};

const parseUserOptions = function(userOptions) {
  const args = {};
  args["beverage"] = getNextElement(userOptions, "--beverage");
  args["empId"] = getNextElement(userOptions, "--empId");
  args["qty"] = getNextElement(userOptions, "--qty");
  return args;
};

exports.getCmdRef = getCmdRef;
exports.parseUserOptions = parseUserOptions;
exports.getNextElement = getNextElement;
