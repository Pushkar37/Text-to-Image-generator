const express = require('express')
const cors =require( 'cors')
const dotenv= require('dotenv') 
const ConnectToDb=require("../server/config/database")
const userRouter=require("./routes/userRoutes")
const ImageRouter = require('./routes/imageRoutes')


dotenv.config();

const port= process.env.Port || 3000;
const app= express();

app.use(express.json());
app.use(cors());


 ConnectToDb();


 app.use("/api/user",userRouter);
 app.use("/api/image",ImageRouter);
app.get("/",(req,res)=> res.send("API Working"));
app.listen(port,()=>{
    console.log("Listening on port ,", port);
})
