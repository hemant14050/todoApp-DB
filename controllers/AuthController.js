const User = require("../models/User");

exports.signUp = async(req, res) => {
    try {
        // get data from req.body
        // console.log("body: ", req.body);
        const {userName, email, password, confirmPassword} = req.body;
        // console.log(userName, email, password, confirmPassword);
        if(!userName || !email || !password || !confirmPassword) {
            res.render("pages/signUp", {
                error: {
                    success: false,
                    message: "All fields are required!"
                }
            });
            return;
        }

        // check pass and confim pass
        if(password !== confirmPassword) {
            res.render("pages/signUp", {
                error: {
                    success: false,
                    message: "Password and confirm should match!"
                }
            });
            return;
        }

        // check is user email exists in db
        const existingUser = await User.findOne({email});
        if(existingUser) {
            res.render("pages/signUp", {
                error: {
                    success: false,
                    message: "User with same email exists."
                }
            });
            return;
        }

        // create new user in DB
        const newUser = await User.create({
            userName,
            email,
            password
        });
        // console.log("NewUser: ", newUser);

        // return response
        res.render("pages/login", {error: null});
        return;

    } catch(err) {
        console.log("Error in signUp: ", err);
        res.render("pages/SignUp", {
            error: {
                success: false,
                message: "Internal server error"
            }
        });
        return;
    }
}

exports.login = async(req, res) => {
    try {
        // get data from req.body
        const {email, password} = req.body;
        // check all field are there
        if(!email || !password) {
            res.render("pages/login", {
                error: {
                    success: false,
                    message: "All fields are required!"
                }
            });
            return;
        }
        
        const user = await User.findOne({email});
        // check user exists
        if(!user) {
            res.render("pages/login", {
                error: {
                    success: false,
                    message: "User not exists!"
                }
            });
            return;
        }
        // check password same in db
        if(password !== user.password) {
            res.render("pages/login", {
                error: {
                    success: false,
                    message: "Password does not match!"
                }
            });
            return;
        }
        // return response and session loggedin
        req.session.isLoggedIn = true;
        req.session.userName = user.userName;
        res.redirect("/");
        return;

    } catch(err) {
        console.log("Error in login: ", err);
        res.render("pages/login", {
            error: {
                success: false,
                message: "Internal Server error"
            }
        });
        return;
    }
}