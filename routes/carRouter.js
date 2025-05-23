var express = require('express');
var router = express.Router();
const carController = require("../controllers/carController");

router.get('/getAllCar',carController.getAllCars );/* GET users listing. */

router.get('/getCarById/:id',carController.getCarById );/* GET users listing. */

router.post('/addCar',carController.addCar)

router.post('/addCarWithOwner',carController.addCarWithOwner)

router.put('/UpdateCarById/:id',carController.UpdateCarById)

router.put('/deleteCar/:id',carController.deleteCar)


module.exports = router;
