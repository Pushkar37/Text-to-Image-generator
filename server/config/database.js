const mongoose = require("mongoose");

const ConnectToDb=async ()=>{
  await  mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
    console.log("Connection Established")
  })
}

module.exports = ConnectToDb;