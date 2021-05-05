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


//Adding course by faculty
router.post('/add-course',async (req,res,next)=>{
    try { 
        const {  courseCode,
            courseName, offeringFaculty } = req.body
        const course = await courseSchema.findOne({ courseCode })
            if (course) {
                errors.courseCode = "Given Subject is already added"
                return res.status(400).json(errors)
            }
        
        const newCourse = await new courseSchema({
            
            courseCode,
            courseName,
            offeringFaculty
        })
        await newCourse.save()

        const students = await studentSchema.find({ department, year })
            if (students.length === 0) {
                errors.department = "No branch found for given subject"
                return res.status(400).json(errors)
            }
            else {
                for (var i = 0; i < students.length; i++) {
                    students[i].subjects.push(newSubject._id)
                    await students[i].save()
                }
                res.status(200).json({ newSubject })
            }
        }
        
    
    catch (err) {
        console.log(`error in adding new subject", ${err.message}`)
    }

});

//finding all the subjects
router.post('/getallsubjects', async (req, res, next) => {
    try {
        const allSubjects = await courseSchema.find({})
        if (!allSubjects) {
            return res.status(404).json({ message: "You havent registered any subject yet." })
        }
        res.status(200).json(allSubjects)
    }
    catch (err) {
        res.status(400).json({ message: `error in getting all Subjects", ${err.message}` })
    }
});

module.exports=router;
