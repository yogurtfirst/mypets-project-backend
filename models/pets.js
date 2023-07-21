const { Schema, Types, model } = require("mongoose");
const petSexEnum = require("../constants/petSexEnum");
const addPetEnum = require("../constants/addPetEnum");

const petsSchema = Schema({
  addType: {
    type: String,
    enum: Object.values(addPetEnum),
    required: [true, "Add type is required"],
  },
  titleOfAdd: {
    type: String,
  },
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
  },
  location: {
    type: String,
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
  owner: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "Pet must have an owner"],
  },
});

const Pets = model("Pets", petsSchema);

module.exports = Pets;
