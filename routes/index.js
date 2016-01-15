var express = require('express');
var router = express.Router();

router.get('/gods', function (req, res){
	res.sendfile('./public/godData.json');
});

router.get('/smiteData', function (req, res){
	res.sendfile('./public/smiteData.json');
});

router.get('/lolData', function (req, res){
	res.sendfile('./public/lolData.json');
});
/* GET home page. */
router.get('*', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
