var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/client', function(req, res, next) {
  res.status(200).json('index');
});

module.exports = router;
