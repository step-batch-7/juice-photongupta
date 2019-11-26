const fs = require("fs");
const optionsLib = require("./src/options");

const main = function() {
  const userOptions = process.argv.slice(2);
  const commandRef = optionsLib.getCmdRef(userOptions);
  const args = optionsLib.parseUserOptions(userOptions);
  const date = new Date();
  const path = "./annaJuiceRecord.json";
  const encoding = "utf8";
  const messageToShow = commandRef(
    args,
    path,
    fs.readFileSync,
    encoding,
    fs.writeFileSync,
    date
  );
  console.log(messageToShow);
};

main();
