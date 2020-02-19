const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { forumPost } = require("./myModule");
const { accReg } = require("./myModule");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const clientDir = __dirname + "\\client\\";

app.get("/", (request, response) => response.sendFile(clientDir + "index.html"));
app.get("/forum", (request, response) => response.sendFile(clientDir + "forum.html"));
app.get("/contact", (request, response) => response.sendFile(clientDir + "contact.html"));
app.get("/aboutme", (request, response) => response.sendFile(clientDir + "aboutme.html"));
app.get("/register", (request, response) => response.sendFile(clientDir + "register.html"));
app.get("/login", (request, response) => response.sendFile(clientDir + "login.html"));
app.get("/forumPosted", (request, response) => response.sendFile(clientDir + "forumPosted.html"));
app.get("/accCreated", (request, response) => response.sendFile(clientDir + "accCreated.html"));
app.get("/styles", (request, response) => response.sendFile(clientDir + "styles.css"));

app.post("/forum", (request,response) =>
{
    name=request.body.name;
    topic=request.body.topic;
    message=request.body.message;
    console.log("Username: "+name+" Topic: "+topic+" Message: "+message);
    forumPost(name,topic,message);
    response.sendFile(clientDir + "forumPosted.html");
});

app.post("/register", (request,response) =>
{
    let username=request.body.username;
    let password=request.body.password;
    let dob=request.body.dob;
    let gender=request.body.gender;
    console.log("Username: "+username+" Password: "+password+" Date of birth: "+dob+" Gender: "+gender);
    accReg(username,password,dob,gender, "nima", "register");
    response.sendFile(clientDir + "accCreated.html");
});








app.get("*", (request, response) => response.sendFile(clientDir+"error.html"))


app.listen(8080);