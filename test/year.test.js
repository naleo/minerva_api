const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const mongoose = require("mongoose");
const minervaTestSuite = require("./suites/minervaTestSuite");
const app = require("../api/api");
const { expect, assert } = require("chai");
const should = chai.should();
chai.use(chaiHttp);

minervaTestSuite("API Assignments Endpoint", (signUpThenLogIn) => {
    it("GET /api/assigments --> array assignments", (done) => {
        signUpThenLogIn((agent) => {
            agent.get("/api/assignments").end((err, res) => {
                console.log(res.body);
                assert.isArray(res.body);
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                agent.close();
                done();
            });
        });
    });
    it("GET /api/assigments/:id --> 404 (assignment not found)", (done) => {
        signUpThenLogIn((agent) => {
            agent.get("/api/assignments/24").end((err, res) => {
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                expect(res.body)
                    .to.have.property("error")
                    .that.equals("Assignment does not exist!");
                agent.close();
                done();
            });
        });
    });
    it("POST /api/assignents --> freshly created assignment", (done) => {
        signUpThenLogIn((agent) => {
            agent
                .post("/api/assignments")
                .send({ description: "wizard1" })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    assert.isString(res.body.description);
                    expect(res.body)
                        .to.have.property("description")
                        .that.equals("wizard1");
                    agent.close();
                    done();
                });
        });
    });

    //it("PATCH /api/assignments/:id --> returns updated assignment by id", (done) => {});
    //it("DELETE /api/assignments/:id --> returns 204 if successful", (done) => {});
    //it("DELETE /api/assignments/:id --> 404 if assignment not found", (done) => {});
});
