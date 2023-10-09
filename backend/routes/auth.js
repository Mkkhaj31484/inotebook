const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { validationResult, ValidationChain, body } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');

// create a user using POST"/api/auth/".Doesn't require auth;

var JWT_SECRET ="MUYTKT$5ecsgyd";

const validate = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };

  router.post('/createUser', validate([
    body('email',"enter a valid email").isEmail(),
    body('password',"enter a valid password").exists().isLength({ min: 6 }),
  
  ]), async (req, res, next) => {
    try {
      let success = false;
    // request is guaranteed to not have any validation errors.
     let user = await User.findOne({email:req.body.email});
     if(user){
      return res.status(400).json({error:"email already matches with the record"});
      success = false;
     }
     var salt = await bcrypt.genSalt(10);
     var secPass = await bcrypt.hashSync(req.body.password, salt);
     user = await User.create({ 
        name :req.body.name,
               password:secPass,
             email:req.body.email
    });//.then(user =>res.json(user));
  const data ={
    user:{
      id: user.id
    }
  }
  success = true;
    var token = jwt.sign(data,JWT_SECRET);
  res.json({success,token});
   
  }
   catch (error) {
    success = false;
      console.error(error.message);
      res.status(500).send({success,error:"some error occured"});
   }
  // api:/api/auth/login 
  });

  // adding a new endpoint with api :/api/auth/login;
  router.post('/login', validate([
    body('email',"enter a valid email").isEmail(),
    body('password',"enter a valid password").exists().isLength({ min: 6 }),
  
  ]), async (req, res, next) => {
   let success = false;
    const {email,password} = req.body;
    try{
    let user = await User.findOne({email});
    if(!user){
     return res.status(400).json({error:"Please try lo login with correct credentials"});
    } 
    const passCompare = await bcrypt.compare(password,user.password);
    if(!passCompare){
      return res.status(400).json({error:"Please try to login with correct credentials"});
      success = false;
    }
    const data ={
      user:{
        id: user.id
      }
    }
    success = true;
    const authentication = jwt.sign(data,JWT_SECRET);
    res.json({success,authentication});
  }
    catch (error) {
      console.error(error.message);
      res.status(500).send({error:"some error occured"});
   }

  })

  // adding a new endpoint to see the details of the user logged in except password
// api key:/api/auth/logged

router.post('/getuser',fetchuser, async (req, res) => {

try{
const userId = req.user.id;
const user = await User.findById(userId).select("-password");
res.send(user);
}
catch(error){
  console.error(error.message);
  res.status(401).send({error:"Internal Error"});
}
});


// router.post('/',validate([
// body('email').isEmail(),
// body('password').isLength({min:6}),
// body('name').isLength({min:6})
// ])
// ,async(req,res,next)=>{

//     const user = await User.create({
//         name :req.body.name,
//         password:req.body.password,
//         email:req.body.email
//     });
// // console.log(req.body);
// // const user = User(req.body);
// // user.save();
// // res.send(req.body);
// }).then(user=>res.json(user));
module.exports = router;