const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  const cityName = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=1c68f34f96b7c38415653f0c447212be&units=metric"
  https.get(url,function(respons){
    respons.on("data",function(data){
      const weatherData = JSON.parse(data)
      const icon = weatherData.weather[0].icon
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1> The weather in "+cityName+" is "+description+" and the temp is :"+temp+"</h1>")
      res.write("<img src="+imageURL+">")
      res.send()
    })
  })
})

app.listen(3000,function(){
  console.log("You conected to 3000 port")
})
