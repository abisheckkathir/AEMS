const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const router=express.Router();

const studentSchema=require('../models/students');
const facultySchema=require('../models/faculty');
const chairSchema=require('../models/chairperson');
const authorize=require('../middlewares/auth');

const { check, validationResult }=require('express-validator');

// Sign-in student
router.post('/signin-student', (req,res,next) => {
    let getUser;
    studentSchema.findOne().then().then().catch();
});

// Sign-in faculty
router.post('/signin-faculty', (req,res,next) => {
    let getUser;
    facultySchema.findOne().then().then().catch();
});

// Sign-in chair
router.post('/signin-chair', (req,res,next) => {
    let getUser;
    chairSchema.findOne().then().then().catch();
});



module.exports=router;