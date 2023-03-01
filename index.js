require('dotenv').config()
const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();


app.use('/api/v1/booking', bookingRoutes)

app.listen(8080, ()=>{
    console.log("SERVER IS RUNNING TO THE PORT OF 8080")
})

