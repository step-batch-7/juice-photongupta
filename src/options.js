const entryOrder = require("./entryOrder.js");

const parseOptions = function(userOptions) {
  let command = userOptions[0];
  let commandRefs = {
    "--save": entryOrder.saveRecord,
    "--query": "just wait!!!! i will come to u"
  };
  return commandRefs[command];
};

exports.parseOptions = parseOptions;
