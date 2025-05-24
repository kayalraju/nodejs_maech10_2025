


const jwt=require('jsonwebtoken')



const AuthCheck=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        const dcodeddata=jwt.verify(req.cookies.userToken,process.env.JWT_SECRET)
        req.user=dcodeddata
        next()
    }else{
        next()
    }

}

module.exports=AuthCheck