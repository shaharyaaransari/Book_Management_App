const mongoose = require("mongoose");


const rolesEnum = ["CREATOR", "VIEW_ALL"];

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: rolesEnum, default: "VIEW_ALL" }
});

const UserModels =  mongoose.model("User", userSchema);

module.exports = UserModels;
