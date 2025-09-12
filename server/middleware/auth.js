const jwt=require("jsonwebtoken");


const UserAuth=(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        res.json({
            sucess:false,
            Message:"User Not Authorized"
        });
    }
    try {
        
        const tokenDecode=jwt.verify(token,process.env.JWT_SCRECT);
        if(tokenDecode.id){
            if(req.body){

                req.body.userId=tokenDecode.id;
            }
        }
        else{
            res.json({
                sucess:false,
                Message:"User Not Authorized"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({
            sucess:false,
            Message:error.Message
        });
    }
}
module.exports=UserAuth;