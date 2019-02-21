const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTodoInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  //Text Validation

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Todo must be between 10 & 300 character!!";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Todo field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
