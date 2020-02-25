const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');
const myModule = require("./myModule");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')(passport);

const clientDir = __dirname + "\\client\\";

app.get("/", (request, response) => response.sendFile(clientDir + "index.html"));
app.get("/forum", (request, response) => response.sendFile(clientDir + "forum.html"));
app.get("/contact", (request, response) => response.sendFile(clientDir + "contact.html"));
app.get("/aboutme", (request, response) => response.sendFile(clientDir + "aboutme.html"));
app.get("/register", (request, response) => response.sendFile(clientDir + "register.html"));
app.get("/login", (request, response) => response.sendFile(clientDir + "login.html"));
app.get("/logout", (request, response) => response.sendFile(clientDir + "logout.html"));
app.get("/forumPosted", (request, response) => response.sendFile(clientDir + "forumPosted.html"));
app.get("/accCreated", (request, response) => response.sendFile(clientDir + "accCreated.html"));
app.get("/styles", (request, response) => response.sendFile(clientDir + "styles.css"));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.post("/forum", (request,response) =>
{
    let name=request.body.name;
    let topic=request.body.topic;
    let message=request.body.message;
    console.log("Username: "+name+" Topic: "+topic+" Message: "+message);
    myModule.forumPost(name,topic,message);
    response.redirect('/forumPosted');
});

app.post("/register", (request,response) =>
{
    let name=request.body.name;
    let password=request.body.password;
    let dob=request.body.dob;
    let gender=request.body.gender;
    console.log("Username: "+name+" Password: "+password+" Date of birth: "+dob+" Gender: "+gender);
    myModule.accReg(name,password,dob,gender);
    response.sendFile(clientDir + "accCreated.html");
});








app.get("*", (request, response) => response.sendFile(clientDir+"error.html"))


app.listen(8080);