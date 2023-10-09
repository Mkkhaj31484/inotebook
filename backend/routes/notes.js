const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { validationResult, ValidationChain, body } = require('express-validator');
const fetchuser= require('../middleware/fetchuser');
const Notes = require("../models/Notes");
// validation parts
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

 // first end point fetchnote that are already added

router.get('/fetchallnotes',fetchuser,async(req,res,next)=>{
   try {
 var notes = await Notes.find({user:req.user.id});
   res.json(notes);
} catch (error) {
   console.error(error.message);
   res.status(500).send({error:"some error occured"});
}
})

// second endpoint in notes which is add notes 

router.post('/addnote', fetchuser,validate([
   body('title',"enter a valid title").isLength({min:3}),
   body('description',"enter a valid description").isLength({ min: 6 })
 
 ]), async (req, res) => {
   try {
      const {title,description,tag} = req.body;
      const note = new Notes({
         title,description,tag,user:req.user.id
      })

      const savenote = await note.save();
      res.json(savenote);

   }
catch(error){
   console.error(error.message);
   res.status(500).send({error:"some error occured"});
}
})

//endpoint fur updating a note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
try{
   const {title,description,tag} = req.body;
   const newnote ={};
   //Creating a newnote
   if(title){newnote.title = title};
   if(description){newnote.description = description};
   if(tag){newnote.tag = tag};

   // finding a note to update and update it 
   let note =await Notes.findById(req.params.id);
   if(!note)return res.status(404).send("Not Found");
    // checkig if user trying to update is real user oir not
   if(note.user.toString() != req.user.id) return res.status(401).send("Not Allowed");
      //if real user exists the update the notes 
   note =await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});

  res.send(note);
}catch(error){
   console.error(error.message);
   res.status(500).send({error:"some error occured"});
}
})

// endpoint for deleting a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try{
      // finding a note to be deleted and delete it
      let note =await Notes.findById(req.params.id);
      if(!note)return res.status(404).send("Not Found");
       // checkig if user trying to delete is real user oir not
      if(note.user.toString() != req.user.id) return res.status(401).send("Not Allowed");
         //if real user exists the delete the notes 
      note =await Notes.findByIdAndDelete(req.params.id);
      return res.status(200).send("Deleted Successfully");
   }
   catch(error){
      console.error(error.message);
   res.status(500).send({error:"some error occured"});

   }
})



module.exports = router;