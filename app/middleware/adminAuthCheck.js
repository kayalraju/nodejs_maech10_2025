


const jwt=require('jsonwebtoken')



const adminAuthCheck=(req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        const dcodeddata=jwt.verify(req.cookies.adminToken,process.env.JWT_SECRET_ADMIN)
        req.admin=dcodeddata
        console.log('admin',req.admin);
        
        next()
    }else{
        next()
    }

}

module.exports=adminAuthCheck