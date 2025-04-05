var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.status(200).json('hello 9antra 2025');
});

module.exports = router;
