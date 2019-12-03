const { performSaveCmd } = require("./entry.js");
const { performQueryCmd } = require("./query.js");
const isValid = require("../src/isInputValid");

const getErrorMessage = function() {
  return "invalid Input";
};

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
  return { cmdRef: getErrorMessage };
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
exports.getErrorMessage = getErrorMessage;
