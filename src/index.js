const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const PORT = 3000;
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://AkshayMakwana:Akshay123@cluster0.zmta9.mongodb.net/premium-user-DB",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDB is Connected"))
.catch((error)=>console.log(error))

app.use('/',route)             

app.listen(PORT, ()=>{
    console.log(`Express app running on Port ${PORT}`)
});