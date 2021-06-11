var expect = require('chai').expect;
var baseurl = "http://localhost:4000"
const { Router, response } = require("express");
const express = require('express')
const bodyParser = require('body-parser')
//const request = require("supertest");
const app = express();
const request = require("request");
const route = Router();
var server = require( '../server' )

route.use(bodyParser.urlencoded({ extended: true }))
describe('Server start test',() => {
before( done =>
  {this.timeout(5000);
    server.on( "started", function()
    {
      done()
    })
  })
});
// Registering Faculty id
describe('Unit testing for registering faculty', () => {
    it('register valid faculty :1', function (done) {
        this.timeout(10000);
        var jsondata = { idno: 'facultytest1', name: 'f02', password: '123456789', userType: 'faculty', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('register valid faculty :2', function (done) {
        var jsondata = { idno: 'facultytest2', name: 'f02', password: '123456789', userType: 'faculty', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });
});

//Registering Student id
describe('Unit testing for registering student', () => {
    it('register valid student :1', function (done) {
        var jsondata = { idno: 'studenttest1', name: 's02', password: '123456789', userType: 'student', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('register valid student:2', function (done) {
        var jsondata = { idno: 'studenttest2', name: 's02', password: '123456789', userType: 'student', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });
});

//Registering Chair id
describe('Unit testing for registering and deleting chair', () => {
    it('should return registered chair successfully', function (done) {
        var jsondata = { idno: 'chairrtest1', name: 'chair02', password: '123456789', userType: 'Chair', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('should return registered chair successfully', function (done) {
        var jsondata = { idno: 'chairrtest2', name: 'chair02', password: '123456789', userType: 'Chair', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });
    it('should return registered chair successfully', function (done) {
        var jsondata = { idno: 'chairrtest4', name: 'chair02', password: '123456789', userType: 'Chair', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });
});


//Login Faculty
describe('Unit testing for faculty signin', () => {
    it('valid faculty login :1', function (done) {
        var jsondata = { idno: 'facultytest1', password: '123456789', userType: 'faculty' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.userType).to.equal("faculty")
                expect(body.user.password).to.be.a('string')
                expect(body.user.idno).to.equal("facultytest1")
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('valid faculty login :2', function (done) {
        var jsondata = { idno: 'facultytest2', password: '123456789', userType: 'faculty' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.userType).to.equal("faculty")
                expect(body.user.password).to.be.a('string')
                expect(body.user.idno).to.equal("facultytest2")
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('invalid faculty login :1', function (done) {
        var jsondata = { idno: 'faculytest1', password: '123446789', userType: 'student' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });

    it('invalid faculty login :2', function (done) {
        var jsondata = { idno: 'facultytest2', password: '162567', userType: 'student' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });
});


// Login student
describe('Unit testing for student signin', () => {
    it('valid student login :1', function (done) {
        var jsondata = { idno: 'studenttest1', password: '123456789', userType: 'student' }
        request.post({ url: baseurl + '/api/auth/signin-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.userType).to.equal("student")
                expect(body.user.password).to.be.a('string')
                expect(body.user.idno).to.equal("studenttest1")
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('valid student login :2', function (done) {
        var jsondata = { idno: 'studenttest2', password: '123456789', userType: 'student' }
        request.post({ url: baseurl + '/api/auth/signin-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.userType).to.equal("student")
                expect(body.user.password).to.be.a('string')
                expect(body.user.idno).to.equal("studenttest2")
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('invalid login student :1', function (done) {
        var jsondata = { idno: 'studenttest1', password: '1234589', userType: 'student' }
        request.post({ url: baseurl + '/api/auth/signin-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });

    it('invalid login student :2', function (done) {
        var jsondata = { idno: 'std2', password: '123456789', userType: 'student' }
        request.post({ url: baseurl + '/api/auth/signin-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });

});


// Login chair
describe('Unit testing for chair signin', () => {
    it('1: should return login successful', function (done) {
        var jsondata = { idno: 'chairrtest1', password: '123456789', userType: 'chair' }
        request.post({ url: baseurl + '/api/auth/signin-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.userType).to.equal("chair")
                expect(body.user.password).to.be.a('string')
                expect(body.user.idno).to.equal("chairrtest1")
                expect(response.statusCode).to.equal(200);
                done();
            });

    });


    it('2: should return login successful', function (done) {
        var jsondata = { idno: 'chairrtest2', password: '123456789', userType: 'chair' }
        request.post({ url: baseurl + '/api/auth/signin-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.userType).to.equal("chair")
                expect(body.user.password).to.be.a('string')
                expect(body.user.idno).to.equal("chairrtest2")
                expect(response.statusCode).to.equal(200);
                done();
            });

    });



    it('1: invalid login', function (done) {
        var jsondata = { idno: 'chairrtest1', password: '12345971', userType: 'chair' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });

    it('2: invalid login', function (done) {
        var jsondata = { idno: 'chairrtest2', password: '123459', userType: 'chair' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });

    it('3: invalid login', function (done) {
        var jsondata = { idno: 'chairtest3', password: '145971', userType: 'chair' }
        request.post({ url: baseurl + '/api/auth/signin-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {

                expect(body.message).to.equal("Authentication failed")
                expect(response.statusCode).to.equal(401);
                done();

            });
    });

});


// Add course flow    
describe('Unit testing for faculty adding course', () => {
    it('1: course added', function (done) {
        var jsondata = { courseCode: 'Coursetest7', courseName: 'python', offeringFaculty: 'facultytest1', isApproved: 'Yes' }
        request.post({ url: baseurl + '/api/auth/add-course', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('2: course added', function (done) {
        var jsondata = { courseCode: 'Coursetest71', courseName: 'python1', offeringFaculty: 'facultytest1', isApproved: 'Yes' }
        request.post({ url: baseurl + '/api/auth/add-course', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('3: course added', function (done) {
        var jsondata = { courseCode: 'Coursetest72', courseName: 'python3', offeringFaculty: 'facultytest2', isApproved: 'Yes' }
        request.post({ url: baseurl + '/api/auth/add-course', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });

    it('4: course added', function (done) {
        var jsondata = { courseCode: 'Coursetest73', courseName: 'python4', offeringFaculty: 'facultytest2', isApproved: 'Yes' }
        request.post({ url: baseurl + '/api/auth/add-course', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });
});



// sprint2
//approve faculty course
describe('Unit testing for chair offciate the course', () => {

    it('should be able to approve course :1', function (done) {
        request.post({ url: baseurl + '/api/auth/approve-course/Coursetest7pythonfacultytest1', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
    it('should be able to approve course :2', function (done) {
        request.post({ url: baseurl + '/api/auth/reject-course/Coursetest71python1facultytest1', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
    it('should be able to approve course :3', function (done) {
        request.post({ url: baseurl + '/api/auth/approve-course/Coursetest72python3facultytest2', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
    it('should be able to approve course :4', function (done) {
        request.post({ url: baseurl + '/api/auth/reject-course/Coursetest73python4facultytest2', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

//reject course
describe('Unit testing for chair reject the course', () => {
    it('should reject course :1', function (done) {
        request.post({ url: baseurl + '/api/auth/reject-course/Coursetest72python3facultytest2', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('should reject course :2', function (done) {
        request.post({ url: baseurl + '/api/auth/reject-course/Coursetest73python4facultytest2', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });

    });
});

//assign course - approve
describe('Unit testing for chair offciate the assign course', () => {

    it('should  approve assign course :1', function (done) {
        request.post({ url: baseurl + '/api/auth/approve-assign/studenttest1Coursetest7python', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('should  approve assign course :2', function (done) {
        request.post({ url: baseurl + '/api/auth/approve-assign/studenttest1Coursetest71python1', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

//assign course -reject
describe('Unit testing for chair reject the assign course', () => {

    it(' reject assign course :1', function (done) {
        request.post({ url: baseurl + '/api/auth/reject-assign/studenttest2Coursetest72python3', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it(' reject assign course :2', function (done) {
        request.post({ url: baseurl + '/api/auth/reject-assign/studenttest2Coursetest73python4', headers: { 'content-type': 'application/json' }, json: true },

            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});


// delete course
describe('Unit testing for faculty deleting course', () => {
    it('1: to delete course', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-course/Coursetest72python3facultytest2' },
            function (error, response, body) {

                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('2: to delete course', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-course/Coursetest73python4facultytest2' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });


    it('3: to delete course', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-course/Coursetest7pythonfacultytest1' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });


    it('4: to delete course', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-course/Coursetest71python1facultytest1' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

// Validate Student id

describe('Unit testing for checking existing student id', () => {

    it('return student id exists :1', function (done) {
        var jsondata = { idno: 'studenttest1', name: 's02', password: '123456789', userType: 'student', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });

    });

    it('return student id exists  :2', function (done) {
        var jsondata = { idno: 'studenttest2', name: 's02', password: '123456789', userType: 'student', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-student', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });
    });
});

// Validate faculty id
describe('Unit testing for checking existing faculty id', () => {

    it('check existing faculty :1', function (done) {
        var jsondata = { idno: 'facultytest1', name: 'f02', password: '123456789', userType: 'faculty', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });

    });
    it('check existing faculty :2', function (done) {
        var jsondata = { idno: 'facultytest2', name: 'f02', password: '123456789', userType: 'faculty', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-faculty', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });
    });
});

// validating chair id
describe('Unit testing for validating and deleting chair', () => {
    it('should return chair id exists', function (done) {
        var jsondata = { idno: 'chairrtest1', name: 'c02', password: '123456789', userType: 'Chair', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });

    });
    it('should return chair id exists', function (done) {
        var jsondata = { idno: 'chairrtest2', name: 'c02', password: '123456789', userType: 'Chair', dept: 'Computer Science' }
        request.post({ url: baseurl + '/api/auth/register-chair', body: jsondata, headers: { 'content-type': 'application/json' }, json: true },
            function (error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });

    });
});

// Delete Student id
describe('Unit testing for deleting student id', () => {
    it('should be able to delete student', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-student/studenttest1' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('should be able to delete student', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-student/studenttest2' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();

            });
    });
});


// Delete faculty id
describe('Unit testing for deleting faculty id', () => {
    it('delete faculty :1', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-faculty/facultytest1' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('delete faculty :2', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-faculty/facultytest2' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

//Delete Chair id
describe('Unit testing for deleting chair id', () => {
    it('should be able to delete chair', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-chair/chairrtest1' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('should be able to delete chair', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-chair/chairrtest2' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
    it('should be able to delete chair', function (done) {
        request.delete({ url: baseurl + '/api/auth/delete-chair/chairrtest4' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});
