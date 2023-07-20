const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const usersSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  city: {
    type: String,
  },
  avatarURL: String,
  token: {
    type: String,
    default: null,
  },
  isNewUser: {
    type: Boolean,
    default: true,
  },
});

usersSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=retro`;
  }

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

usersSchema.methods.checkPassword = (candidate, hash) => {
  return bcrypt.compare(candidate, hash);
};

const Users = model("Users", usersSchema);

module.exports = Users;
