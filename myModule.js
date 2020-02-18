var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017/nima";


exports.forumPost = function (username, topic, message, bas, collection) {
  console.log("test")
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(bas);
    var myobj = { username: `${username}`, topic: `${topic}`, message: `${message}` };
    dbo.collection(collection).insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }
  );
};

exports.accReg = function (username, password, dob, gender, bas, collection) {
  console.log("test")
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(bas);
    var myobj = { username: `${username}`, password: `${password}`, date_of_birth: `${dob}`, gender: `${gender}`};
    dbo.collection(collection).insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }
  );
};