var express = require('express');
var http = require('http');

var NeteaseMusic = require('simple-netease-cloud-music');
var nm = new NeteaseMusic();

var router = express.Router();
var URL = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/first', function(req, res, next) {
  res.render('first', { title: 'first', arr: ['张三', '李四', '王五'] })
})

router.get('/crawler', function (req, res, next) {
  http.get('http://www.jianshu.com/', function(response){
    var data = ''
    response.on('data', (chunk) => {
      data += chunk
    })
    .on('end', () => {
      res.end(data)
    })
  })
})

router.get('/search', function(req, res) {
  var url = URL.parse(req.url, true);
  var wd = url.query.wd;
  var page = url.query.page || 1;
  var songId = url.query.songId;
  res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8', 'Access-Control-Allow-Origin': '*'});
  if (wd) {
    nm.search(wd, (page-1) * 10 + 1, 10).then(data => {
      let resStr = JSON.stringify(data);
      res.end(resStr);
    })
  } else {
    nm.url(songId).then(data => {
      let resStr = JSON.stringify(data);
      res.end(resStr);
    })
  }
})

module.exports = router;
