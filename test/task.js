let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { deleteOne } = require("../models/User");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe(`Task Api`, () => {
  chai
    .request(server)
    .get("/api/posts")
    .end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a("array");
      response.body.length.should.be.eq("3");
      done();
    });
});
