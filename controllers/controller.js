const modelsmsg = require('../models/adminPanelModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let storeTodoData = [];


const defaultController = async (req, res) => {

    // ...for Secure Route
    if (req.cookies.userId) {
        const fNameProfile = req.cookies.fname;
        const emailProfile = req.cookies.email;

        const user = await req.cookies.userName;
        console.log("userName : ", user);

        res.render('index', {
            user,
            fname: fNameProfile,
            email: emailProfile
        });
    } else {
        res.redirect('/login');
    }





    // let getdata = await modelsmsg.find()
    // res.render('index', { todos: getdata });

}




// Sign Up Form Submission Process

const signupController = (req, res) => {
    res.render('signup');
}
const postSignupController = async (req, res) => {
    if (req.body.password === req.body.con_pass) {
        // console.log("hello",req.body);
        const hash = await bcrypt.hash(req.body.password, saltRounds)
        // Store hash in your password DB.
        console.log("bcrypt passsss", hash);
        try {
            const userData = {
                fname: req.body.fname,
                email: req.body.email,
                password: hash
            }
            const newData = new modelsmsg(userData)
            await newData.save();
            console.log("newDATA", newData);

            res.cookie('id', newData._id);
            res.redirect('/login');
        } catch (err) {
            res.send("your Email is already exists..")
        }


    } else {
        console.log("could not found form data..");
    }
}



// Login Form Submit Process


const loginController = (req, res) => {
    res.render('login');
}


const PostLoginController = async (req, res) => {
    console.log("Login Pending..");

    const userLogin = await modelsmsg.find({
        email: req.body.email
    })
    console.log("userLOGIN", userLogin);


    if (userLogin) {
        bcrypt.compare(req.body.password, userLogin[0].password, async (err, result) => {
            if (!err) {
                res.cookie("userId", userLogin[0]._id.toString());
                // Jab new user login kare tab .. jis user ne login kiya unka name aa jaayega....example:- welcome   krunal.
                res.cookie("userName", userLogin[0].fname);
                res.cookie("email", userLogin[0].email);
                res.cookie("password", userLogin[0].password);
                res.redirect('/');
            }
        })
    } else {
        res.redirect('/login');
        res.send("Welcome to Maroon")
    }
}






// const profileController = (req, res)=>{
//     res.render('profile')
// }


const profileController = async (req, res) => {

    const fname = await req.cookies.fname;
    const email = await req.cookies.email;
    const password = await req.cookies.password;

    res.render('profile', {
        fname: fname,
        email: email,
        password:password
    });

}





module.exports = { defaultController, signupController, loginController, postSignupController, PostLoginController, profileController };
