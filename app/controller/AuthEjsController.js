const User=require('../model/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


class AuthEjsController{

    async checkAuth(req,res,next){
        try{
            if(req.user){
                next()
            }else{
                res.redirect('/login')
            }

        }catch(error){
            console.log(error);
            
        }

    }
    async registerview(req,res){
        try{
            res.render('register')

        }catch(error){
            console.log(error);
            
        }
    }
    async registerCreate(req,res){
        try{
       const {name,email,password}=req.body
       const hashed= bcryptjs.hashSync(password,bcryptjs.genSaltSync(10))
       const data=new User({
        name,email,password:hashed,
       })
       const result=await data.save()
       if(result){
        console.log('register successfully');
        res.redirect('/login')
        
       }else{
         console.log('register failed');
        res.redirect('/register')
       }

        }catch(error){
            console.log(error);
            
        }
    }
    async loginview(req,res){
        try{
            res.render('login')

        }catch(error){
            console.log(error);
            
        }
    }
 
    async loginCreate(req,res){
        try{
           const {email,password}=req.body
           if(!(email && password)){
            console.log('all input is require');
            res.redirect('/login')
           }
           const user=await User.findOne({email})
           if(user && (await bcryptjs.compare(password,user.password))){
            const token= jwt.sign({
                id:user._id,
                name:user.name,
                email:user.email
            },process.env.JWT_SECRET,{expiresIn:"5h"})

            if(token){
                res.cookie('userToken',token)
                res.redirect('/dashboard')
            }else{
                console.log('faild');
                
            }
           }
           console.log('login failed');
            res.redirect('/login')
           
        }catch(error){
            console.log(error);
            
        }
    }


       async dashboard(req,res){
        try{
            res.render('dashboard',{
                data:req.user
            })

        }catch(error){
            console.log(error);
            
        }
    }
       async logout(req,res){
        try{
            res.clearCookie('userToken')
            res.redirect('/login')

        }catch(error){
            console.log(error);
            
        }
    }
}



module.exports=new AuthEjsController()