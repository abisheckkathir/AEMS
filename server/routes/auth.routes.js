const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const studentSchema = require('../models/students');
const facultySchema = require('../models/faculty');
const chairSchema = require('../models/chairperson');
const courseSchema = require('../models/course');
const assignSchema = require('../models/assignedCourses');
const auth = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

router.get("/", auth, async (req, res) => {
  try {
    const user = await facultySchema.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    //console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// Sign-in student
router.post('/signin-student', (req, res, next) => {
  //console.log("entered backend signin");
  let getUser;
  //console.log(req.body.idno);
  studentSchema.findOne({ idno: req.body.idno }).then((user) => {
    if (!user) {
      //console.log('Authentication failed1')
      //console.log(user);
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }
    getUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then((response) => {
    if (!response) {
      //console.log('Authentication failed2')
       res.status(401).json({
        message: 'Authentication failed',
      });
    }
    else{
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
      user:getUser,
      userType:"student",
    });}
  })
    .catch((err) => {
      return res.status(409).json({
        message: "Authentication failed",
      });
    });
});

// Sign-in faculty
router.post('/signin-faculty', (req, res, next) => {
  //console.log("entered backend signin");

  let getUser;
  facultySchema.findOne({ idno: req.body.idno }).then((user) => {
    if (!user) {
      //console.log('Authentication failed1')
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }
    getUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then((response) => {
    if (!response) {
      //console.log('Authentication failed2')
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
      user:getUser,
      userType:"faculty",

    });
  })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});

// Sign-in chair
router.post('/signin-chair', (req, res, next) => {
  let getUser;
  chairSchema.findOne({ idno: req.body.idno }).then((user) => {
    if (!user) {
      //console.log('Authentication failed1')
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }
    getUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then((response) => {
    if (!response) {
      //console.log('Authentication failed2')
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
      user:getUser,
      userType:"chair",

    });
  })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});

//Add course by faculty
router.post('/add-course', (req, res) => {
    //console.log('course')
    const course = courseSchema.findOne({ courseCode: req.body.courseCode })
    if (!course) {
      return res.status(400).json()
    }

    const newCourse = new courseSchema({

      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      offeringFaculty: req.body.offeringFaculty,
      isApproved: req.body.isApproved,
      _id:req.body.courseCode+req.body.courseName+req.body.offeringFaculty,
    })
    newCourse.save().then((response) => {
      //console.log('done');
      return res.status(200).json({
        resp:response
      });
    });

});
router.post(
  "/register-faculty",
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new facultySchema({
          idno: req.body.idno,
          name: req.body.name,
          dept: req.body.dept,
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
            //console.log(user);
            //Send authorization token
            return res.status(200).json({
              token: jwtToken,
              user:user,
              userType:"faculty",

            });
          })

          .catch((error) => {
            res.status(500).json({
              error: error,
            });
            //console.log(error);
          });
      });
    }
  }
);
router.post(
  "/register-student",
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new studentSchema({
          idno: req.body.idno,
          name: req.body.name,
          dept: req.body.dept,
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
              user:user,
              userType:"student",

            });
          })

          .catch((error) => {
            res.status(500).json({
              error: error,
            });
            //console.log(error);
          });
      });
    }
  }
);
router.post(
  "/register-chair",
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new chairSchema({
          idno: req.body.idno,
          name: req.body.name,
          dept: req.body.dept,
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
              user:user,
              userType:"chair",

            });
          })

          .catch((error) => {
            res.status(500).json({
              error: error,
            });
            //console.log(error);
          });
      });
    }
  }
);
router.route("/course-list").get((req, res) => {
  //console.log("courselist")
  if (req.query.offeringFaculty.length==0){
    courseSchema.find((error, response) => {
      if (error) {
  
        return res.status(401).json({
          message: "Authentication failed",
        });
      } else {
        // //console.log(response)
        res.status(200).json(response);
      }
    });
  }else{
  var query = { offeringFaculty: req.query.offeringFaculty };
  courseSchema.find(query,(error, response) => {
    if (error) {

      return res.status(401).json({
        message: "Authentication failed",
      });
    } else {
      // //console.log(response)
      res.status(200).json(response);
    }
  });
}
});

router.route("/delete-course/:ids").delete((req, res, next) => {
  // console.log(req.params);
  var idarr = req.params.ids.split(",");
  // console.log(idarr);
  courseSchema.deleteMany({ '_id': { '$in': idarr }}, (error, data) => {
    if (error) {
      return next(error);
    } else if (data.deletedCount != 0) {
      // console.log(data);
      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "Course not found",
      });

    }
  });
});
router.post('/approve-course/:ids', (req, res) => {
  //console.log('approve')
  var idarr = req.params.ids.split(",");
  courseSchema.updateMany({ '_id': { '$in': idarr }},{ $set: { isApproved:"Yes"}}, (error, data) => {
    if (error) {
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);
      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "Course not found",
      });

    }
  });

});
router.post('/assign-course/:ids/:fid', (req, res) => {
  //console.log('assign')
  var idarr = req.params.ids.split(",")
  //console.log(fid)
  var fid= req.params.fid.split(",")
  var flen=idarr.length
  assignSchema.deleteMany({ 'studentID': { '$in': fid }}, (error, data) => {
  for(let i=0;i<flen;i++){
    const newCourse = new assignSchema({

      courseCode: idarr[i],
      studentID: fid[0],
      isApproved: "Pending",
      _id:fid[0]+idarr[i],
    })
    newCourse.save();}
  });
  
  
  
});
router.post('/reject-course/:ids', (req, res) => {
  //console.log('reject')
  var idarr = req.params.ids.split(",");
  courseSchema.updateMany({ '_id': { '$in': idarr }},{ $set: { isApproved:"No"}}, (error, data) => {
    if (error) {
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);
      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "Course not found",
      });

    }
  });

});
router.post('/approve-assign/:ids', (req, res) => {
  //console.log('approve')
  var idarr = req.params.ids.split(",");
  assignSchema.updateMany({ '_id': { '$in': idarr }},{ $set: { isApproved:"Yes"}}, (error, data) => {
    if (error) {
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);
      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "Course not found",
      });

    }
  });

});
router.post('/reject-assign/:ids', (req, res) => {
  //console.log('reject')
  var idarr = req.params.ids.split(",");
  assignSchema.updateMany({ '_id': { '$in': idarr }},{ $set: { isApproved:"No"}}, (error, data) => {
    if (error) {
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);
      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "Course not found",
      });

    }
  });

});


router.route("/delete-faculty/:id").delete((req, res, next) => {
  facultySchema.deleteOne({ 'idno': req.params.id, }, (error, data) => {
    if (error) {
      //console.log(error);
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);

      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "User not found",
      });

    }
  });
});
router.route("/delete-student/:id").delete((req, res, next) => {
  studentSchema.deleteOne({ 'idno': req.params.id, }, (error, data) => {
    if (error) {
      //console.log(error);
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);

      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "User not found",
      });

    }
  });
});
router.route("/delete-chair/:id").delete((req, res, next) => {
  chairSchema.deleteOne({ 'idno': req.params.id, }, (error, data) => {
    if (error) {
      //console.log(error);
      return next(error);
    } else if (data.deletedCount != 0) {
      //console.log(data);

      res.status(200).json({
        msg: data,
      });
    }
    else {

      res.status(500).json({
        message: "User not found",
      });

    }
  });
});
router.route("/assign-list").get((req, res) => {
  //console.log("assignlist")
  if (req.query.studentID.length==0){
    assignSchema.find((error, response) => {
      if (error) {
  
        return res.status(401).json({
          message: "Authentication failed",
        });
      } else {
        // //console.log(response)
        res.status(200).json(response);
      }
    });
  }else{
  var query = { studentID: req.query.studentID };
  assignSchema.find(query,(error, response) => {
    if (error) {

      return res.status(401).json({
        message: "Authentication failed",
      });
    } else {
      // //console.log(response)
      res.status(200).json(response);
    }
  });
}
});
module.exports = router;

