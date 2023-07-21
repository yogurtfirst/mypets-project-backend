const { Schema, Types, model } = require("mongoose");
const petSexEnum = require("../constants/petSexEnum");

const petsSchema = Schema({
  name: {
    type: String,
    required: [true, "Pet name is required"],
  },
  birthday: {
    type: String,
    required: [true, "Pet birthday is required"],
  },
  type: {
    type: String,
    required: [true, "Pet type is required"],
  },
  sex: {
    type: String,
    enum: Object.values(petSexEnum),
    required: [true, "Pet sex is required"],
  },
  price: {
    type: Number,
  },
  comments: {
    type: String,
  },
  photoURL: {
    type: String,
    required: [true, "Pet photo is required"],
  },
  isForSale: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "Pet must have an owner"],
  },
});

const Pets = model("Pets", petsSchema);

module.exports = Pets;
