const validator = require("validator");
const validateSignUpdata = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not valid");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every((fields) => {
    return allowedEditFields.includes(fields);
  });
  console.log(isEditAllowed);
  return isEditAllowed;
};

module.exports = { validateSignUpdata, validateProfileEditData };
