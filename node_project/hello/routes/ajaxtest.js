var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ajaxtest");
});

// httpL//127.0.0.1L3000/ajax/ajaxtest1
router.get('/ajaxtest1', function(req, res, next) {
  res.render("ajax/ajaxtest1");
});
// send 함수가 적당히 알아서 데이터 보낸다
router.get('/result1', function(req, res, next) {
  res.send("data만 보낸다");
});

router.get('/ajaxtest2', function(req, res, next) {
  res.render("ajax/ajaxtest2");
});

// http://127.0.0.1:3000/ajax/add?x=5&y=7
router.get('/add', function(req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x+y;
  res.json({result:z});
});

module.exports = router;
