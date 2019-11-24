const optionsLib = require("./src/options");

const main = function() {
  console.log("Anna Juice Ltd");
  const userOptions = process.argv.slice(2);
  const commandRef = optionsLib.parseOptions(userOptions);
  const date = new Date();
  const massegeToShow = commandRef(userOptions, date);
  console.log(massegeToShow);
};

main();
