const { Schema, Types, model } = require("mongoose");
const petSexEnum = require("../constants/petSexEnum");
const noticeTypeEnum = require("../constants/noticeTypeEnum");

const noticesSchema = Schema({
  noticeType: {
    type: String,
    enum: Object.values(noticeTypeEnum),
    required: [true, "Notice type is required"],
  },
  title: {
    type: String,
    required: [true, "Title of add is required"],
  },
  name: {
    type: String,
    required: [true, "Pet name is required"],
  },
  birthday: {
    type: String,
    required: [true, "Pet birthday is required"],
  },
  petType: {
    type: String,
    required: [true, "Pet type is required"],
  },
  sex: {
    type: String,
    enum: Object.values(petSexEnum),
    required: [true, "Pet sex is required"],
  },
  location: {
    type: String,
    required: [true, "Pet location is required"],
  },
  price: {
    type: Number,
    default: null,
  },
  comments: {
    type: String,
    required: [true, "Comments is required"],
  },
  photoURL: {
    type: String,
    required: [true, "Pet photo is required"],
  },
  photoId: {
    type: String,
  },
  owner: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "Pet must have an owner"],
  },
});

const Pets = model("Notices", noticesSchema);

module.exports = Pets;
