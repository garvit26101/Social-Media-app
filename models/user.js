const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

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
  password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String,
  },
  about: {
    type: String,
    trim: true,
  },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
  resetPasswordLink: {
    data: String,
    default: "",
  },
});

// userSchema
//   .virtual("password")
//   .set((password) => {
//     this._password = password;
//     //generate a timestamp
//     this.salt = uuidv4();
//     //encrypt the password
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// userSchema.methods = {
//   encryptPassword: function (password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
// };

userSchema.methods = {
  //havent hashed password thats why cheking with plain password
  authenticate: function (plainText) {
    return plainText === this.password;
  },
};
//methods/encryption process

module.exports = mongoose.model("User", userSchema);
