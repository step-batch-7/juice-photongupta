const optionsLib = require("./src/options");
const utils = require("./src/utilities");

const main = function() {
  const argsAndCommandRef = optionsLib.parseOptions(process.argv);
  const args = argsAndCommandRef.args;
  const commandRef = argsAndCommandRef.cmdRef;
  const stubbedDate = new Date(process.env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  const date = hasValidStubbedDate ? stubbedDate : new Date();
  // const date = new Date(process.env.NOW) || new Date();
  const fileOperations = utils.getFileOperations(process.env.Path);
  const beverageRecords = utils.readFile(fileOperations);
  const messageToShow = commandRef(args, beverageRecords, date, fileOperations);
  console.log(messageToShow);
};

main();
