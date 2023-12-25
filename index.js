//jshint esversion:6

import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import date from "./date.js"
import {port,mongooseUrl} from "./config.js"
import router from "./Routes/listRoute.js"




const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use('/',router)


mongoose.connect(mongooseUrl)
 .then(()=>{
    console.log("Database is connected")
    app.listen(port, function () {
      console.log("Server started on port 3000");
    });
 })
 .catch((error)=>{
   console.log(error)
 })






