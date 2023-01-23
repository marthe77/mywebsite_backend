let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);
let accesstoken = null;
describe(`authApi`, () => {
  //test the post route
  describe("POST /api/auth/register", () => {
    it("it should REGISTER a new user", (done) => {
      chai
        .request(server)
        .post("/api/auth/register")
        .send({
          username: "irasubiza",
          email: "irasubiza@gmail.com",
          password: "123456",
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("array");
          done();
        });
    });

    it("it should not register a new user", (done) => {
      chai
        .request(server)
        .post("/api/auth/register")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });

  describe("post /api/auth/login", () => {
    it("it should post new login user", (done) => {
      chai
        .request(server)
        .post("/api/auth/login")
        .end((err, response) => {
          // console.log(response)
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});

it("it should post new login user", (done) => {
  chai
    .request(server)
    .post("/api/auth/login")
    .send({
      email: "irasubiza@gmail.com",
      password: "123456",
    })
    .end((err, res) => {
      accesstoken = res.body.token;
      done();
    });
});
describe("/post", () => {
  it("it should login", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({
        username: "irasubiza",
        email: "irasubiza@gmail.com",
      })
      .end((err, res) => {
        accesstoken = res.token;
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
});

describe("/post", () => {
  it("it should check user credentials", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: "irasubiza@gmail.com", password: "123456" })
      .end((err, res) => {
        accesstoken = res.token;
        response.should.have.status(401);
        done();
      });
  });
});
