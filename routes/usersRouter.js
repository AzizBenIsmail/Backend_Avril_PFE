var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const uploadfile = require('../middlewares/uploadFile');
const {requireAuthUser} = require("../middlewares/authMiddleware")

/* GET users listing. */
router.get('/getAllUsers',requireAuthUser,userController.getAllUsers );
router.get('/getUserById/:id',userController.getUserById );
router.post('/login',userController.login );
router.post('/logout',requireAuthUser,userController.logout );
router.post('/addClient',userController.addClient );
router.post('/addAdmin',requireAuthUser,userController.addAdmin );
router.post('/addUserWithImage',uploadfile.single("image_user"),userController.addUserWithImage );
router.put('/updatePassword/:id',requireAuthUser,userController.updatePassword );
router.put('/updateUser/:id',requireAuthUser,userController.updateUser );
router.delete('/deletUserById/:id',userController.deletUserById );

module.exports = router;
