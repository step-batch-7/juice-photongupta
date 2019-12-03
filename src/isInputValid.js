const options = require("./options");

const isWholeNumber = function(qty) {
  return Number.isInteger(+qty) && +qty >= 0;
};

const isInputValid = function(args) {
  let result = false;
  const argument = options.parseUserOptions(args.slice(3));
  const isValidQty = isWholeNumber(argument.qty);
  const isEmpIdValid = isWholeNumber(argument.empId);
  const isValidBeverageOption = argument.hasOwnProperty("beverage");
  const isValidDateOption = argument.hasOwnProperty("date");
  if (args[2] == "--save") {
    result = isValidQty && isEmpIdValid && isValidBeverageOption;
  }
  if (args[2] == "--query") {
    result =
      isValidQty || isEmpIdValid || isValidBeverageOption || isValidDateOption;
  }
  return result;
};

exports.isInputValid = isInputValid;
