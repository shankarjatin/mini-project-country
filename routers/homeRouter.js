

const express = require("express");
const Router  = express.Router();
const HomeSchema = require("../models/homeSchema");
// const Token = require("../models/token");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");


const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");



// nodemailer authentication

const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth :{
        user: "shankarjatin1005@outlook.com",
        pass: "Jatin@1003j"
    }
})


// home Router

Router.get("/", (req,res)=>{
res.render("landingPage",{title:"fill form",password:"",email:""})})




Router.post("/signup",async(req,res)=>{
    try{
            const {
                uname,
                email,
                password,
                cpassword
            }=req.body;
            
            const useremail =await HomeSchema.findOne({email:email})
                //    if(email===useremail.email){
                    if(useremail){
                       res.render("register",{title:"",password:"",email:"USer exists"})
                   }
                   else{
                    if(password===cpassword){
                               const  userData = new HomeSchema({
                                uname,
                                email,
                                password,
                               })
                               userData.save( err=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    const useremail = HomeSchema.findOne({email:email})
                                    const options1 ={
                                        from: "shankarjatin1005@outlook.com",
                                        to: req.body.email,
                                        subject: "Sign-up Notification!",
                                       html:'<h1>You have been Registered</h1><br><h1>Welcome !</h1>'
                                    
                                        };
                                      
                                            transporter.sendMail(options1,  (err, info)=> {
                                                if(err){
                                                console.log(err);
                                                return;
                                                }
                                                console.log("Sent: " + info.response);
                                                })
                     res.render("register",{title:"User Added Check Your mail",password:"",email:""});
                                }
                               })
                   }
    }}
catch(e){
    console.log(e)
}})


// login router

Router.post("/login", (req,res)=>{
    console.log(req.body)
    const {
        email,
        password
    }= req.body;

    HomeSchema.findOne({email:req.body.email},(err,result)=>{
        console.log(result)
        console.log(result.email)
       if(req.body.email===result.email && req.body.password===result.password){
        res.render("userdash",{ name:result.uname , email:result.email})
       }
       else{
        console.log(err);
       }
    })
})

Router.get('/views', function(req, res, next) {
    res.sendFile(__dirname+'/views/index1.html')
 });

 Router.get('/city', function(req, res, next) {
    res.sendFile(__dirname+'/views/index2.html')
  })
 
module.exports = Router;