const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const router=express.Router();

const studentSchema=require('../models/students');
const facultySchema=require('../models/faculty');
const chairSchema=require('../models/chairperson');
const authorize=require('../middlewares/auth');
const courseSchema=require('../models/course');
const { check, validationResult }=require('express-validator');

// Sign-in student
router.post('/signin-student', (req,res,next) => {
    let getUser;
    studentSchema.findOne({ rollno: req.body.idno })
    .then((user) => {
        if(!user) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        getUser=user;
        return bcrypt.compare(req.body.password,user.password);
    }).then((response) => {
        if(!response) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        let jwtToken=jwt.sign({
            rollno: getUser.rollno,
            userID: getUser._id,
        },
        'secret',
        {
            expiresIn: '1h',
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser,
        });
    }).catch((err) => {
        return res.status(401).json({
            message: 'Authentication failed',
        });
    });
});

// Sign-in faculty
router.post('/signin-faculty', (req,res,next) => {
    let getUser;
    facultySchema.findOne({ idno: req.body.idno }).then((user) => {
        if(!user) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        getUser=user;
        return bcrypt.compare(req.body.password,user.password);
    }).then((response) => {
        if(!response) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        let jwtToken=jwt.sign({
            idno: getUser.idno,
            userID: getUser._id,
        },
        'secret',
        {
            expiresIn: '1h',
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser,
        });
    }).catch((err) => {
        return res.status(401).json({
            message: 'Authentication failed',
        });
    });
});

// Sign-in chair
router.post('/signin-chair', (req,res,next) => {
    let getUser;
    chairSchema.findOne({ idno: req.body.idno }).then((user) => {
        if(!user) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        getUser=user;
        return bcrypt.compare(req.body.password,user.password);
    }).then((response) => {
        if(!response) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        let jwtToken=jwt.sign({
            idno: getUser.idno,
            userID: getUser._id,
        },
        'secret',
        {
            expiresIn: '1h',
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser,
        });
    }).catch((err) => {
        return res.status(401).json({
            message: 'Authentication failed',
        });
    });
});

module.exports=router;
