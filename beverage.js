const optionsLib = require("./src/options");
const utils = require("./src/utilities");

const main = function() {
  const argsAndCommandRef = optionsLib.getArgsAndCmdRef(process.argv);
  const args = argsAndCommandRef.args;
  const commandRef = argsAndCommandRef.cmdRef;
  const date = new Date();
  const fileOperations = utils.getFileOperations();
  const beverageRecords = utils.readFile(fileOperations);
  const messageToShow = commandRef(args, beverageRecords, date, fileOperations);
  console.log(messageToShow);
};

main();
