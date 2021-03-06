const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongooseConnect = require("../../api/database");
const app = require("../../api/api");
const should = chai.should();
chai.use(chaiHttp);

module.exports = (testDescription, testsCallBack) => {
    describe(testDescription, () => {
        const signUpThenLogIn = (testCallBack) => {
            const agent = chai.request.agent(app);
            agent
                .post("/api/register")
                .send({
                    firstName: "Test",
                    username: "Wizard",
                    password: "security",
                    email: "test_email@gmail.com"
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .end((err, res) => {
                    agent
                        .post("/api/login")
                        .send({
                            username: "Wizard",
                            password: "security"
                        })
                        .set("Content-Type", "application/json")
                        .set("Accept", "application/json")
                        .end((err, res) => {
                            should.not.exist(err);
                            res.should.have.status(200);
                            testCallBack(agent);
                        });
                });
        };

        const clearDB = async () => {
            for (var i in mongoose.connection.collections) {
                await mongoose.connection.collections[i].deleteMany(() => {});
            }
        };

        before(async () => {
            //before stuff like setting up the app and the mongoose server.
            let mongoServer = await MongoMemoryServer.create();
            const mongoURI = mongoServer.getUri();
            process.env.MONGO_URI = mongoURI;
            await mongooseConnect
                .dbconnect()
        });

        beforeEach(async () => {
            //becforeEach stuff clearing out the db.
            await clearDB();
            await mongooseConnect.roleSetup();
        });

        after(async () => {
            //after stuff like shutting down the app and the mongoose server.
            await clearDB();
            await mongooseConnect.dbclose();
        });

        testsCallBack(signUpThenLogIn);
    });
};
