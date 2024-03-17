const express = require("express");
const bodyParser = require('body-parser');
const mongoose= require("mongoose")
const authRoutes = require("./Routes/AuthRoutes")
const cookieParser = require("cookie-parser")
const applicationRoutes = require("./Routes/ApplicationRoutes")
const app = express()
app.listen(4000, ()=> {
    console.log("Server connection successful")
})
mongoose.connect("mongodb://localhost:27017/api").then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log(err.message);
});


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
//app.use("/apply",applicationRoutes);


