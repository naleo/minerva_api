const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const mongoose = require('mongoose');
const minervaTestSuite = require("./suites/minervaTestSuite");
const app = require('../api/api');
const should = chai.should();
chai.use(chaiHttp);

minervaTestSuite('Minerva API', () => {
    it('GET /api/assignments --> array assignments', done => {
        chai
        .request(app)
        .post('/api/assignments')
        .send({ description: "wizard1" })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.description.should.equal("wizard1");
            done();
        })
        /*
        return request(app)
        .get('/api/assignments')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(respons.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                    })
                ])
            )
        })
        */

     });

    /*it('GET /api/assignments/:id --> specific assignment by id', () => { });
    it('GET /api/assignments/:id --> 404 (assignment not found)', () => { });
    it('POST /api/assignments --> freshly created todo', () => {
        return request(app).post('/api/assignments').send({
            name: 'hi'
        }).expect('Content-Type', /json/).expect(201);
     });
    it('GET /api/assignments --> validates request body', () => {
        return request(app).post('/api/assignments').send({ name: 123 }).expect(422);
     });
    it('PATCH /api/assignments/:id --> returns updated assignment by id', () => { });
    it('DELETE /api/assignments/:id --> returns 204 if successful', () => { });
    it('DELETE /api/assignments/:id --> 404 if assignment not found', () => { });*/
})