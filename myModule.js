var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kronhus.tk:27017/";


exports.updateDb = function (topic, name, message, bas, collection)
{
    console.log("test")
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(bas);
        var query = { topic: `${topic}` };
        dbo.collection(collection).find(query).toArray(function (err, result) {
          if (err) throw err;
          console.log("DEBUG")
          console.log(result);
          if (result.length!=0) {
              console.log("Topic exist.")
              db.close();
            
          } else {
            var myobj = { name: `${name}`, topic: `${topic}`, message: `${message}`};
            dbo.collection(collection).insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          }
        });
      });
};