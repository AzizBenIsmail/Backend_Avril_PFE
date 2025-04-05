var express = require('express');
var router = express.Router();
const osController = require("../controllers/osController");

// router.get('/getDataFromPc', function(req, res, next) {
//   try {
//     const osInformation={
//         hostname : os.hostname(),
//         type : os.type()
//     }
//     res.status(200).json(osInformation);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.get('/getDataFromPc',osController.getOsInformation );/* GET users listing. */

router.get("/cpus",osController.osCpus);

router.get("/cpus/:id",osController.osCpusById);

module.exports = router;
