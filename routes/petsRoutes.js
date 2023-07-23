const express = require("express");
const petsCtrl = require("../controllers/pets");
const petsMdwr = require("../middlewares/pets");
const { protect } = require("../middlewares/auth");

const petsRouter = express.Router();

petsRouter.use(protect);

petsRouter.post("/", petsMdwr.checkAddPet, petsCtrl.addPet);
petsRouter.get("/", petsCtrl.listMyPets);
petsRouter.delete("/:petId", petsCtrl.deletePet);

module.exports = petsRouter;
