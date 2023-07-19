const express = require('express')
// const petsMdwr = require('../middlewares/pets')
const petsCtrl = require('../controllers/pets')

const petsRouter = express.Router()

petsRouter.post('/', petsCtrl.addPet) 
petsRouter.get('/', petsCtrl.listMyPets) 
petsRouter.delete('/:petid', petsCtrl.deletePet)

module.exports = petsRouter