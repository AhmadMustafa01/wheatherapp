// jshint esversion:6
const express = require("express");
const https = require("https");
const app = express();
const fs = require('fs');
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=*myid*=london";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const wheatherdata = JSON.parse(data);
      const result = wheatherdata.weather[0].description;
      const temperature = wheatherdata.main.temp;
      const icon = wheatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";




      console.log(result);
      res.write("<h1> cloud condition is " + result + " in london</h1>");

      res.write(" temp is " + temperature + " degree celsius");
      res.write("<img src=" + imageURL + ">");
      res.send();

    });
  });



});

app.get("/city",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/city",function(request,response){
   var city=request.body.cityname;
     const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=755b2180c65a82ac979b13b77dd3d0d1&q="+city;
  https.get(url,function(res){
    res.on("data",function(data){
    const wheatherdata = JSON.parse(data);
    const result = wheatherdata.weather[0].description;
    const temperature = wheatherdata.main.temp;
    const icon = wheatherdata.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    response.write("<h1> cloud condition is " + result + " in "+city+" </h1>");

    response.write(" temp is " + temperature + " degree celsius");
    response.write("<img src=" + imageURL + ">");
    response.send();
  });
});
});




app.listen(8000, function() {
  console.log("server has started at 3000");
});
