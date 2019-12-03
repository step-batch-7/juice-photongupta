const optionsLib = require("./src/options");
const utils = require("./src/utilities");
const config = require("./src/config");

const main = function() {
  const argsAndCommandRef = optionsLib.parseOptions(process.argv);
  const args = argsAndCommandRef.args;
  const commandRef = argsAndCommandRef.cmdRef;
  const date = config.timeStamp(process.env);
  const path = config.getDataStorePath(process.env);
  const fileOperations = utils.getFileOperations(path);
  const beverageRecords = utils.readFile(fileOperations);
  const messageToShow = commandRef(args, beverageRecords, date, fileOperations);
  console.log(messageToShow);
};

main();
