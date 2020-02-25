const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = "mongodb://localhost:27017/nima";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var postSchema = new Schema({
  name: String,
  topic: String,
  message: String
});

var userSchema = new Schema({
  name: String,
  password: String,
  dob: Date,
  gender: String
});

const name = mongoose.model('name', userSchema);

exports.forumPost = function (name, topic, message) {
  var Post = mongoose.model('Post', postSchema)
  var post = new Post({name: name, topic: topic, message: message})
  post.save()
  console.log("Post Made!")
};

exports.getTopics = function () {
  var Post = mongoose.model('Post', postSchema)
  var posts = Post.find()
  return posts;
};

exports.accReg = function (name, password, dob, gender) {
  var Acc = mongoose.model('Acc', userSchema)
  var acc = new Acc({name: name, password: password, dob: dob, gender: gender})
  acc.save()
  console.log("Account Registered!")
};

exports.getAcc = function () {
  var Acc = mongoose.model('Acc', userSchema)
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