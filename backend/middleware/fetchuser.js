const express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var JWT_SECRET ="MUYTKT$5ecsgyd";

const fetchuser =(req,res,next)=>{
    
    const token  = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Access Denied"});
    }
    try{
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();
    }
    catch(error){
        console.error(error.message);
        res.status(401).send({error:"Internal Error"});
    }
}
module.exports = fetchuser;
