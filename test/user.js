let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe(`userApi`, () => {
  //test the get route
  describe("GET /api/users", () => {
    it("it should get all the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("it should not get all the users", (done) => {
      chai
        .request(server)
        .get("/api/user")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe("GET /api/users/:id", () => {
    it("it should get a user by id", (done) => {
      const id = "63b696e18c84a4c2b7a304cf";
      chai
        .request(server)
        .get(`/api/users/${id}`)
        .end((err, response) => {
          // console.log(response)
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("it should not get a user", (done) => {
      chai
        .request(server)
        .get("/api/post/")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  //update user
  describe("PUT /api/users/:ID", () => {
    it("it should update user", (done) => {
      const id = "63b696e18c84a4c2b7a304cf";
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .send({
          username: "werrr",
          title: "hey",
          desc: "morning",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
