var expect = require('chai').expect;
var auth = require('../routes/auth.routes');
var axios = require('axios');
const request = require('supertest');
var server = require( '../server' )
describe('Server start test',() => {
before( done =>
  {this.timeout(5000);
    server.on( "started", function()
    {
      done()
    })
  })
});
describe('Unit testing for Register User',() => {
    it('register faculty 1',async function(){
      this.timeout(10000);
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest1',name:'Faculty Test 1',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    it('register faculty 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest2',name:'Faculty Test 2',dept:'ece',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register faculty 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest3',name:'Faculty Test 3',dept:'eee',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register faculty 4',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest4',name:'Faculty Test 4',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register faculty 5',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest5',name:'Faculty Test 5',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register student 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest1',name:'Student Test 1',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    it('register student 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest2',name:'Student Test 2',dept:'ece',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register student 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest3',name:'Student Test 3',dept:'eee',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register student 4',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest4',name:'Student Test 4',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register student 5',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest5',name:'Student Test 5',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register chair 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest1',name:'Chair Test 1',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    it('register chair 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest2',name:'Chair Test 2',dept:'ece',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register chair 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest3',name:'Chair Test 3',dept:'eee',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register chair 4',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest4',name:'Chair Test 4',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('register chair 5',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest5',name:'Chair Test 5',dept:'cse',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/register-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});


describe('Unit testing for Sign In User',() => {
    it('signin genuine faculty 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest1',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin genuine faculty 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest2',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin genuine faculty 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest3',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-faculty',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin imposter faculty 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest4',password:'12345667'});
        await axios.post('http://localhost:4000/api/auth/signin-faculty',body,config).catch(function(e){
          expect(e.response.status).to.equal(401);
      });
    });
    it('signin imposter faculty 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'facultytest5',password:'12345667'});
        await axios.post('http://localhost:4000/api/auth/signin-faculty',body,config).catch(function(e){
            expect(e.response.status).to.equal(401);
        });
    });
    it('signin genuine student 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest1',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-student',body,config).catch(function(e){
          expect(e.response.status).to.equal(401);
      });
    });
    it('signin genuine student 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest2',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin genuine student 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest3',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-student',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin imposter student 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest1',password:'12345667'});
        await axios.post('http://localhost:4000/api/auth/signin-student',body,config).catch(function(e){
          expect(e.response.status).to.equal(401);
      });
    });
    it('signin imposter student 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'studenttest2',password:'12345667'});
        await axios.post('http://localhost:4000/api/auth/signin-student',body,config).catch(function(e){
          expect(e.response.status).to.equal(401);
      });
    });
    it('signin genuine chair 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest1',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin genuine chair 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest2',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin genuine chair 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest3',password:'1234567'});
        await axios.post('http://localhost:4000/api/auth/signin-chair',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('signin imposter chair 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest4',password:'12345667'});
        await axios.post('http://localhost:4000/api/auth/signin-chair',body,config).catch(function(e){
          expect(e.response.status).to.equal(401);
      });
    });
    it('signin imposter chair 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const body = JSON.stringify({idno:'chairtest5',password:'12345667'});
        await axios.post('http://localhost:4000/api/auth/signin-chair',body,config).catch(function(e){
          expect(e.response.status).to.equal(401);
      });
    });
    
});

describe('Unit testing for Delete User',() => {
    it('delete faculty 1',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-faculty/${'facultytest1'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete faculty 2',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-faculty/${'facultytest2'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete faculty 3',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-faculty/${'facultytest3'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete faculty 4',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-faculty/${'facultytest4'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete faculty 5',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-faculty/${'facultytest5'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete student 1',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-student/${'studenttest1'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete student 2',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-student/${'studenttest2'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete student 3',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-student/${'studenttest3'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete student 4',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-student/${'studenttest4'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete student 5',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-student/${'studenttest5'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete chair 1',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-chair/${'chairtest1'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete chair 2',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-chair/${'chairtest2'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete chair 3',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-chair/${'chairtest3'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete chair 4',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-chair/${'chairtest4'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete chair 5',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-chair/${'chairtest5'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('Unit testing for Add Course',() => {
    it('add course 1',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ courseCode:'111', courseName:'AAA', offeringFaculty:'facultytest',isApproved:'Pending' });        
          await axios.post('http://localhost:4000/api/auth//add-course',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('add course 2',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ courseCode:'222', courseName:'BBB', offeringFaculty:'facultytest',isApproved:'Pending' });        
          await axios.post('http://localhost:4000/api/auth//add-course',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('add course 3',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ courseCode:'333', courseName:'CCC', offeringFaculty:'facultytest',isApproved:'Pending' });        
          await axios.post('http://localhost:4000/api/auth//add-course',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('add course 4',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ courseCode:'444', courseName:'DDD', offeringFaculty:'facultytest',isApproved:'Pending' });        
          await axios.post('http://localhost:4000/api/auth//add-course',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('add course 5',async function(){
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ courseCode:'555', courseName:'EEE', offeringFaculty:'facultytest',isApproved:'Pending' });        
          await axios.post('http://localhost:4000/api/auth//add-course',body,config).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});
describe('Unit testing for Delete Course',() => {
    it('delete course 1',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-course/${'111AAAfacultytest'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete course 2',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-course/${'222BBBfacultytest'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete course 3',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-course/${'333CCCfacultytest'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete course 4',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-course/${'444DDDfacultytest'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it('delete course 5',async function(){
        await axios.delete(`http://localhost:4000/api/auth/delete-course/${'555'}/${'facultytest'}`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});
