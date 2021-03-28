const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

userSchema
  .virtual("password")
  .set((password) => {
    this._password = password;
    //generate a timestamp
    this.salt = uuidv4();
    //encrypt the password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

//methods/encryption process
userSchema.methods = {
  encryptPassword: (password) => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
