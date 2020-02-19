const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = "mongodb://localhost:27017/nima";
mongoose.connect(url);

var postSchema = new Schema({
  dbname: String,
  dbtopic: String,
  dbmessage: String
});

var regSchema = new Schema({
  name: String,
  password: String,
  dob: String,
  gender: String
});


exports.forumPost = function (name, topic, message){
  var Post = mongoose.model('Post', postSchema)
  var post = new Post({dbname: name, dbtopic: topic, dbmessage: message})
  post.save()
  console.log("Post Made!")
};

exports.getTopics = function () {
  var Post = mongoose.model('Post', postSchema)
  var posts = Post.find()
  return posts;
};

exports.accReg = function (name, password, dob, gender){
  var Acc = mongoose.model('Acc', regSchema)
  var acc = new Acc({name: name, password: password, dob: dob, gender: gender})
  acc.save()
  console.log("Account Registered!")
};

exports.getAcc = function () {
  var Acc = mongoose.model('Acc', regSchema)
  var register = Acc.find()
  return register;
};

// exports.forumPost = function (username, topic, message, bas, collection) {
//   console.log("test")
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db(bas);
//     var myobj = { username: `${username}`, topic: `${topic}`, message: `${message}` };
//     dbo.collection(collection).insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   }
//   );
// };

/**exports.accReg = function (username, password, dob, gender, bas, collection) {
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
};*/