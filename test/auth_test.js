var expect = require('chai').expect;
var auth = require('../routes/auth.routes');

describe('Unit testing for signin',() => {
    it('should return OK status',() => {
        return request(auth).post('/api/auth/signin-faculty').set({idno:'faculty1',password:'1234567'}).then((response) => {
            expect(response.statusCode=200);
            done();
        });
    });
});
