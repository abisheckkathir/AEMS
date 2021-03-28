const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const router=express.Router();
const studentSchema=require('../models/students');
const facultySchema=require('../models/faculty');
const chairpersonSchema=require('../models/chairperson');
const authorize=require('../middlewares/auth');
const { check, validationResult }=require('express-validator');

// Sign-in student
router.post('/signin-student', (req,res,next) => {

});

// Sign-in faculty
router.post('/signin-student', (req,res,next) => {

});

// Sign-in student
router.post('/signin-student', (req,res,next) => {

});

module.exports=router;