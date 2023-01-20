let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe(`authApi`, () => {

  //test the get route
  describe("POST /api/auth/register", () =>{
    it("it should REGISTER a new user", (done) => {
         
      chai
        .request(server)
        .get("/api/auth/register")
        .send(
            {
                username:"iranzi",
                email:"iranzi@gmail.com",
                password:"123456"}
        )
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

  it("it should not register a new user", (done) => {
    chai
      .request(server)
      .get("/api/auth/register")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
}); 



describe("post /api/auth/login", () =>{
  it("it should post new login user", (done) => {
     
    chai
      .request(server)
      .get("/api/auth/login")
      .end((err, response) => {
        // console.log(response)
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });

   });});