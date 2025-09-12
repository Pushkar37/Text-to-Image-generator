const userModel = require("../models/model.js");
const jwt=require('jsonwebtoken')
const FormData=require("form-data");
const { Buffer } = require("node:buffer");
const axios=require("axios");
const generateImage=async(req,res)=>{
try {
  const {token}=req.headers;
  const decoded=jwt.verify(token,process.env.JWT_SCRECT)
  const userId=decoded.id;
    const {prompt}=req.body;
    if(!userId||!prompt){
        res.json({
            sucess:false,
            message:"invalid info"
        })
    }
    const user=await userModel.findById(userId);
  if(user.creditBalance==0||user.creditBalance<0){
    res.json({sucess:false,message:"insufficent credits"})
  }
  const formData=new FormData();
  formData.append('prompt',prompt);
  const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
    headers:{
        'x-api-key':process.env.CLIPDROP_API

    },
    responseType:'arraybuffer'
  })
  
  const Base64Image=Buffer.from(data,'binary').toString('base64')
  const resultImage=`data:image/png;base64,${Base64Image}`;
  if(user.creditBalance>0){
  await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1});
  res.json({
    sucess:true,
    message:"Image Generated",
    creditBalance:user.creditBalance-1,
    image:resultImage
  })
  }
} catch (error) {
    console.log(error);
    res.json({
        sucess:false,
        message:error.message
    })
}
}
module.exports=generateImage