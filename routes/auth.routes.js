const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const router=express.Router();

const studentSchema=require('../models/students');
const facultySchema=require('../models/faculty');
const chairSchema=require('../models/chairperson');
const courseSchema=require('../models/course');
const auth = require("../middlewares/auth");
const { check, validationResult }=require('express-validator');

router.get("/", auth, async (req, res) => {
    try {
      const user = await facultySchema.findById(req.user.userId).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
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
            console.log('Authentication failed1')
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        getUser=user;
        return bcrypt.compare(req.body.password,user.password);
    }).then((response) => {
        if(!response) {
            console.log('Authentication failed2')
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        payload = {
            user: {
              idno: getUser.idno,
              userId: getUser._id,
            },
          };
          let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
            expiresIn: "1h",
          });
          return res.status(200).json({
            token: jwtToken,
          });
        })
        .catch((err) => {
          res.status(401).json({
            message: "Authentication failed",
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

//Add course by faculty
router.post('/add-course',(req,res)=>{
    try { 
        console.log('course')
        const course = courseSchema.findOne({courseCode: req.body.courseCode })
            if (!course) {
                return res.status(400).json()
            }
        
        const newCourse = new courseSchema({
            
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            offeringFaculty: req.body.offeringFaculty
        })
        newCourse.save()
        
    }
    catch (err) {
        console.log(`error in adding new subject", ${err.message}`)
    }

});
router.post(
    "/register-user",
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new facultySchema({
            idno: req.body.idno,
            password: hash,
          });
  
          user
            .save()
            .then((response) => {
              if (!response) {
                return res.status(401).json({
                  message: "Authentication failed",
                });
              }
  
              //jwt payload
              payload = {
                user: {
                  idno: user.idno,
                  userId: user._id,
                },
              };
              //jwt signature
              let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
                expiresIn: "1h",
              });
              //Send authorization token
              return res.status(200).json({
                token: jwtToken,
              });
            })
  
            .catch((error) => {
              res.status(500).json({
                error: error,
              });
              console.log(error);
            });
        });
      }
    }
  );
  router.route("/course-list").get((req, res) => {
    courseSchema.find((error, response) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json(response);
      }
    });
  });


module.exports=router;

