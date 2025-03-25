const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kumar:W28GaNp8m1fHZ4T5@devtinder.km1z4.mongodb.net/devTinder"
  );
};

module.exports=connectDB

