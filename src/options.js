const { performSaveCmd } = require("./entryOrder.js");
const { performQueryCmd } = require("./queryOrder.js");
const isValid = require("../src/isInputValid");

const parseOptions = function(userOptions) {
  if (isValid.isInputValid(userOptions)) {
    userOptions = userOptions.slice(2);
    const command = userOptions[0];
    const commandRefs = {
      "--save": performSaveCmd,
      "--query": performQueryCmd
    };
    const args = parseUserOptions(userOptions.slice(1));
    return { cmdRef: commandRefs[command], args: args };
  }
  return wrongInputMessage();
};

const wrongInputMessage = function() {
  return "invalid Input";
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

exports.parseOptions = parseOptions;
exports.parseUserOptions = parseUserOptions;
exports.getNextElement = getNextElement;
