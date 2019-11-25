const fs = require("fs");
const optionsLib = require("./src/options");

const main = function() {
  const userOptions = process.argv.slice(2);
  const commandRef = optionsLib.parseOptions(userOptions);
  const date = new Date();
  const path = "./annaJuiceRecord.json";
  const massegeToShow = commandRef(userOptions, date, path, fs.readFileSync);
  console.log(massegeToShow);
};

main();
