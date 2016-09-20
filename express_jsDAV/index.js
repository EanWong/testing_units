"use strict";
var express = require('express');
var app = express();
var jsDAV = require("jsDAV/lib/jsdav");

app.use(function (req, res, next) {
    if (req.url.search(/^\/webdav/) >= 0) {
      console.log(__dirname);
      jsDAV.mount({
          node: __dirname + "/data",
          mount: "/webdav",
          server: req.app,
          standalone: false
        }
      ).exec(req, res);
    }
    else {
      next();
    }
  }
)

app.get('/', function (req, res) {
    res.send('OK');
  }
);

app.listen(3000);