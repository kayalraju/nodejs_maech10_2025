const { HashedPassword, comparePassword } = require('../middleware/Auth')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

class AuthController {

    async register(req, res) {
        try{
            const {name, email, password} = req.body

            if(!name || !email || !password){
                return res.status(400).json({
                    message: "Please fill all the fields"
                })
            }
            const esixUser=await User.findOne({email})
            if(esixUser){
                return res.status(400).json({
                    message: "User email id already exists"
                })
            }
            const hasPassword=await HashedPassword(password)
            const user=await new User({
                name,
                email,
                password:hasPassword
            }).save()
            return res.status(200).json({
                message: "User created successfully",
                user:user
            })

        }catch(e){
            console.log(e)
        }
    }

    async login(req, res) {
        try{
            const {email, password} = req.body
            if(!email || !password){
                return res.status(400).json({
                    message: "Please fill all the fields"
                })
            }
            User.validate(email,password)

            const user=await User.findOne({email})
            console.log('user',user);
            
            if(!user){
                return res.status(400).json({
                    message: "User not found"
                })
            }
            const ismatch=await comparePassword(password,user.password)
            if(!ismatch){
                return res.status(400).json({
                    message: "Invalid credentials"
                })
            } 
          
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })
            return res.status(200).json({
                message: "Login successful",
                user:{
                    id: user._id,
                    email: user.email,
                    name: user.name
                },
                token: token
            })
           
        }catch(e){
            console.log(e)
        }   
    }

    async dashboard(req,res){
        return res.status(200).json({
            message: "welcome to Dashboard",
            user: req.user
        })
    }
    async profile(req,res){
        return res.status(200).json({
            message: "welcome to profile page",
            data:req.user
        })
    }
}


module.exports =new AuthController()