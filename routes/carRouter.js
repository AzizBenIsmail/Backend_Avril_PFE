var express = require('express');
var router = express.Router();
const carController = require("../controllers/carController");

router.get('/getAllCar',carController.getAllCars );/* GET users listing. */

router.get('/getCarById/:id',carController.getCarById );/* GET users listing. */

router.post('/addCar',carController.addCar)



module.exports = router;
