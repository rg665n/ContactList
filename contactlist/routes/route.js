const express = require('express');
const router = express.Router();


const Contact = require('../models/contacts');

//Get Contact
router.get('/contacts',(req,res,next)=>{
    //res.send('Retrieving Contact List');
    Contact.find(function(err,contacts){
        res.json(contacts);
    })
});

//Add Contact
router.post('/contact',(req,res,next)=>{
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:'Failed to add Contact'});
        }
        else{
            res.json({msg: 'Contact added Succesfully'});
        }
    });
});
//Delete Contact 
router.delete('/contact/:id',(req,res,next)=>{
    //Logic to add contact
    Contact.remove({_id:req.params.id},function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;