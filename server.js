const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { updateDb } = require("./myModule");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const clientDir = __dirname + "\\client\\";

app.get("/", (request, response) => response.sendFile(clientDir + "index.html"));
app.get("/forum", (request, response) => response.sendFile(clientDir + "forum.html"));
app.get("/contact", (request, response) => response.sendFile(clientDir + "contact.html"));
app.get("/aboutus", (request, response) => response.sendFile(clientDir + "aboutus.html"));
app.get("/createaccount", (request, response) => response.sendFile(clientDir + "createaccount.html"));
app.get("/styles", (request, response) => response.sendFile(clientDir + "styles.css"));

app.post("/", (request,response) =>
{
    let name=request.body.name;
    let topic=request.body.topic;
    let message=request.body.message;
    console.log("Name: "+name+" Topic: "+topic+" Message: "+message);
    updateDb(topic,name,message, "nima", "WESWEB");
    response.sendFile(clientDir + "index.html");
});

app.get("*", (request, response) => response.sendFile(clientDir+"error.html"))

app.listen(8080);
