const express = require("express");
const petsCtrl = require("../controllers/pets");
const petsMdwr = require("../middlewares/pets");
const { protect } = require("../middlewares/auth");
const { uploadTmp } = require('../services/multer/');

const petsRouter = express.Router();

petsRouter.use(protect);

petsRouter.post("/", petsMdwr.checkAddPet, uploadTmp.single('photo'), petsMdwr.updateImage, petsCtrl.addPet);
petsRouter.get("/", petsCtrl.listMyPets);
petsRouter.delete("/:petId", petsCtrl.deletePet);

module.exports = petsRouter;
