let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);
chai.should();
const user = {
  username: "admin",
  email: "admin@gmail.com",
};

const newMessage = {
  email: "gikundiro@gmail.com",
  fullname: "Gikundiro Denise",
  content: "hey, you are good developer keep it up",
};

let accesstoken = null;
describe("Message API test", () => {
  describe("/GET", () => {
    beforeEach((done) => {
      chai
        .request(server)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          accesstoken = res.body.accesstoken;
          done();
        });
    });
    it("it should GET all messages", (done) => {
      chai
        .request(server)
        .get("/api/messages")
        .set("Authorization", `Bearer ${accesstoken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe("/GET", () => {
    beforeEach((done) => {
      chai
        .request(server)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          accesstoken = res.body.accesstoken;
          done();
        });
    });
    it("it should GET a single  message", (done) => {
      chai
        .request(server)
        .get("/api/messages/63c86593ca09f3a145d188ac")
        .set("Authorization", `Bearer ${accesstoken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe("/GET", () => {
    beforeEach((done) => {
      chai
        .request(server)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          accesstoken = res.body.accesstoken;
          done();
        });
    });
    it("it should check a single  message Id", (done) => {
      chai
        .request(server)
        .get("/api/messages/63c86593ca09f3a145d188ac")
        .set("Authorization", `Bearer ${accesstoken}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  describe("/post", () => {
    it("it should create a message", (done) => {
      chai
        .request(server)
        .post("/api/messages")
        .send(newMessage)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
  });
});
