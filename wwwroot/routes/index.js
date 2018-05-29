var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("loading index route");
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Microsoft Azure + Cognitive Services', apiKey: process.env.CV_KEY });
});

const toFile = require('data-uri-to-file');
const request = require('request');
var http = require('http');

router.post('/upload', function(req, res) {
  if (!req.body.data) {
    console.log('No files were uploaded.');
    return res.status(400).send('No files were uploaded.');
  }
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = toFile(req.body.data).then(file => {
    var key = "f29da4567c3d4d92afcdc8663be6dc6f";
    var uriBase = "https://australiaeast.api.cognitive.microsoft.com/vision/v2.0/analyze";

    request({
      url: uriBase,
      headers: {
        'Content-Type' : 'application/octet-stream',
        "Ocp-Apim-Subscription-Key": key
      },
      encoding: null,
      method: 'POST',
      body: req.body.data,
      encoding: null
     }, (error, response, body) => {
          if (error) {
            console.log(error);
             res.json({name : error});
          } else {
            console.log(response.body);
            res.json(JSON.parse(response.body.toString()));
          }
     });

     //res.end("ok");

    //console.log(file.mimeType, file.data, file.extension);
  });
});


module.exports = router;
