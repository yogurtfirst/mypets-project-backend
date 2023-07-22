const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
    select: false,
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  avatarURL: {
    type: String,
  },
  avatarId: {
    type: String,
    select: false,
  },
  favorite: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
    default: null,
  },
});

usersSchema.pre("save", async function (next) {
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
