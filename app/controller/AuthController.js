const sendEmailVerificationOTP = require('../helper/sendEmailVerificationOTP')
const { HashedPassword, comparePassword } = require('../middleware/Auth')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const EmailVerifyModel=require('../model/otpModel')

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

           const ifotp=await sendEmailVerificationOTP(req,user)
           if(ifotp){
            return res.status(200).json({
                message: "User created successfully and otp sent to your email",
                user:user
            })
           }

        }catch(e){
            console.log(e)
        }
    }


    async verifyedotp(req,res){
        try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.is_verified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await EmailVerifyModel.findOne({ userId: existingUser._id, otp });

            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEmailVerificationOTP(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.id_verify = true;
            await existingUser.save();

            // Delete email verification document
            await EmailVerifyModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
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
            // Check if user verified
            if (!user.id_verify) {
                return res.status(401).json({ status: false, message: "Your account is not verified" });
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