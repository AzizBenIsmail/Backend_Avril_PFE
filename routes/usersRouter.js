var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const uploadfile = require('../middlewares/uploadFile');

/* GET users listing. */
router.get('/getAllUsers',userController.getAllUsers );
router.get('/getUserById/:id',userController.getUserById );
router.post('/addClient',userController.addClient );
router.post('/addAdmin',userController.addAdmin );
router.post('/addUserWithImage',uploadfile.single("image_user"),userController.addUserWithImage );
router.put('/updatePassword/:id',userController.updatePassword );
router.put('/updateUser/:id',userController.updateUser );
router.delete('/deletUserById/:id',userController.deletUserById );

module.exports = router;
