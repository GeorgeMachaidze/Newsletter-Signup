const bodyParser = require("body-parser");
const express = require("express");
const request = require('request');
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})
//Monacemebis gagzavna Mailchimp-ze
app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var date = {
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
      }
    ]
  };

var jsonDate = JSON.stringify(date);

const url = "https://us21.api.mailchimp.com/3.0/lists/6c91fdeb7a"

const options = {
  method: "POST",
  auth: "geroge1:4836e48ba22be586d32ffae1629ab7c4-us21"
}


const request = https.request(url, options, function(response){

if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html")
}else{
  res.sendFile(__dirname + "/failure.html")
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonDate);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})

//Key
//4836e48ba22be586d32ffae1629ab7c4-us21

//audienceID
//6c91fdeb7a

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port 3000")
})
