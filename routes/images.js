//var express = require('express');
//var router = express.Router();
var extend = require('util')._extend;
var fs = require('fs'),
PNG = require('pngjs').PNG;

/* GET  listing. */
/*
router.get('/', function(req, res, next) {
  invert();
});
*/

function invert() {
  var file = 'in.png';
  var first, second;
  readPNG(file, function() {
    var first = this;
    readPNG('in2.png', function() {
      var second = this;

      if (first.height != second.height || first.width != second.width) {
        console.error("Images are not the same dimensions");
        return;
      }

      for (var y = 0; y < first.height; y++) {
        for (var x = 0; x < first.width; x++) {
          var idx = (first.width * y + x) << 2;

          second.data[idx] = first.data[idx] - second.data[idx];
          second.data[idx+1] = first.data[idx+1] - second.data[idx+1];
          second.data[idx+2] = first.data[idx+2] - second.data[idx+2];
        }
      }

      second.pack().pipe(fs.createWriteStream('out.png'));

    })
  });
}


function readPNG(path, callback) {
  if (!fs.existsSync(path)) {
    console.error(file + ' does not exist');
    return;
  }

  var png = new PNG();
  fs.createReadStream(path)
    .pipe(png)
    .on('error', function() {
      console.error(this.error);
    })
    .on('parsed', callback);
}

invert();

//module.exports = router;
