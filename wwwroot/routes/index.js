var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("loading index route");
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Microsoft Azure + Cognitive Services' });
});


var multer = require('multer');
var upload = multer();
console.log("loading webcam upload route");

router.route("/upload")
    /* replace foo-bar with your form field-name */
    .post(upload.single("data"), function(req, res){
       console.log(JSON.stringify(req.files));
       res.json(JSON.stringify(req.files));
    });

module.exports = router;
