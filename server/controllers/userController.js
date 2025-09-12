const userModel=require('../models/model.js');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
         if(!name||!email||!password){
            res.json({
                success:false,
                message:"Error in entries"
            })
         }
         const hashPassword=await bcrypt.hash(password,10);
         const userDetails={
            name:name,
            email:email,
            password:hashPassword
         }
         const newUser=new userModel(userDetails);
         const user=await newUser.save();
         console.log(user)
         const token=jwt.sign({Id:user._id},process.env.JWT_SCRECT)
         
         res.json({
            success:true,
            token:token,
            user:{name:user.name}
         })
    } catch (error) {
        console.log(error);
        res.json({success:false,
         err:error.message
        })
    }
}
const loginUser=async (req,res) => {
   try {
      const {email,password}=req.body;
      const user=await userModel.findOne({email:email})
      if(!user){
         res.json({
            success:false,
            message:"user does not exists"
         })
      }
      const hashPassword=user.password
      if( !(await bcrypt.compare(password,hashPassword))){
         res.json({success:false,
            message:"Email or password is incorrect"
         })
      }else{
         const token=jwt.sign({id:user._id},process.env.JWT_SCRECT)
         res.json({
            success:true,
            token:token,
            user:{name:user.name}
            
         })
      }
      
   } catch (error) {
      console.log(error)
      res.json({
         success:false,
         error:error.message
      })
   }
}
const Credits=async(req,res)=>{
  try {
   const {token}=req.headers;
    const decoded=jwt.verify(token,process.env.JWT_SCRECT)

    
    
    const user= await userModel.findById(decoded.id);
    
    res.json({
      success:true,
      credits:user.creditBalance,
      user:{name:user.name}
    })
  } catch (error) {
   console.log(error);
   res.json({
      success:false,
      message:error.message
   })
  }
}
module.exports={registerUser,loginUser,Credits};
