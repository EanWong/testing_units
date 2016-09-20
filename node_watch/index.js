"use strict";
var express = require('express');
var app = express();

var watch = require('node-watch');

watch('test_watched_folder/', function(filename) {
  console.log(filename, ' changed.');
});

app.get('/', function (req, res) {
    res.send('OK');
  }
);

app.listen(3000);
