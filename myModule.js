const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = "mongodb://localhost:27017/nima";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//const User = require('./models/Users');

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

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

exports.forumPost = function (name, topic, message) {
  var post = new Post({name: name, topic: topic, message: message})
  post.save()
  console.log("Post Made!")
};

exports.getTopics = function () {
  var posts = Post.find()
  return posts;
};

exports.accReg = function (name, password, dob, gender) {
  var acc = new User({name: name, password: password, dob: dob, gender: gender})
  acc.save()
  console.log("Account Registered!")
};

exports.getAcc = function (uName) {
  console.log(uName)
  var register = User.findOne({name: uName})
  console.log(register);
  return register;
};