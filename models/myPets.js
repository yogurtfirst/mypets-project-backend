const { Schema, Types, model } = require("mongoose");

const myPetsSchema = Schema({
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
},
{
  timestamps: true,
  versionKey: false,
}
);

const MyPets = model("MyPets", myPetsSchema);

module.exports = MyPets;
