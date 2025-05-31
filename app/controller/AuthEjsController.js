const User = require('../model/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


class AuthEjsController {

    async checkAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login')
            }

        } catch (error) {
            console.log(error);

        }

    }
    async registerview(req, res) {
        try {
            res.render('register')

        } catch (error) {
            console.log(error);

        }
    }
    async registerCreate(req, res) {
        try {
            const { name, email, password } = req.body
            const hashed = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
            const data = new User({
                name, email, password: hashed,
            })
            const result = await data.save()
            if (result) {
                console.log('register successfully');
                res.redirect('/login')

            } else {
                console.log('register failed');
                res.redirect('/register')
            }

        } catch (error) {
            console.log(error);

        }
    }
    async loginview(req, res) {
        try {
            res.render('login')

        } catch (error) {
            console.log(error);

        }
    }

    async loginCreate(req, res) {
        try {
            const { email, password } = req.body
            if (!(email && password)) {
                console.log('all input is require');
                res.redirect('/login')
            }
            const user = await User.findOne({ email })
            if (user && (await bcryptjs.compare(password, user.password))) {
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.JWT_SECRET, { expiresIn: "5h" })

                if (token) {
                    res.cookie('userToken', token)
                    res.redirect('/dashboard')
                } else {
                    console.log('faild');

                }
            }
            console.log('login failed');
            res.redirect('/login')

        } catch (error) {
            console.log(error);

        }
    }


    async dashboard(req, res) {
        try {
            res.render('dashboard', {
                data: req.user
            })

        } catch (error) {
            console.log(error);

        }
    }
    async logout(req, res) {
        try {
            res.clearCookie('userToken')
            res.redirect('/login')

        } catch (error) {
            console.log(error);

        }
    }





    //admin

    async checkAuthAdmin(req, res, next) {
        try {
            if (req.admin) {
                next()
            } else {
                res.redirect('/admin/login')
            }

        } catch (error) {
            console.log(error);

        }

    }



    async admindashboard(req, res) {
        try {
            res.render('admindashboard',{
                dataadmin:req.admin
            })
        } catch (error) {
            console.log(error);

        }
    }
    async adminlogin(req, res) {
        try {
            res.render('adminlogin')
        } catch (error) {
            console.log(error);

        }
    }


    async  adminloginCreate(req,res){
        try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            console.log('required');
             req.flash('message1',"All input is required !!");
            return res.redirect('/admin/login');
        }
        // Validate if user exist in our database
        const admin = await User.findOne({ email });

        if (admin && admin.is_admin && (await bcryptjs.compare(password, admin.password))) {
            // Create token
            const tokendata = jwt.sign(
                {
                    id: admin._id,
                    name: admin?.name,
                    email: admin?.email,
                },process.env.JWT_SECRET_ADMIN,{expiresIn: "5h"}
            )
            if (tokendata) {
                res.cookie('adminToken', tokendata)
               return res.redirect('/admin/dashboard');
            } else {
                console.log('login failed');
            }
        }
        req.flash('message1',"Incorrect emai or password !!");
           return res.redirect('/admin/login');
    } catch (err) {
        console.log(err);
    }
    }



    async adminlogout(req, res) {
        try {
            res.clearCookie('adminToken')
            res.redirect('/admin/login')

        } catch (error) {
            console.log(error);

        }
    }

}



module.exports = new AuthEjsController()