//some validation is not working will see later

const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email added" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("enter a strong password" + value);
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("gen data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    about: {
      type: String,
      default: "this is default about me",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
