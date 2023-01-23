let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

const user = {
  email: "admin@gmail.com",
  password: "123456",
};

const newMessage = {
  fullname: "kevine Iradukunda",
  email: "kevineira@gmail.com",
  content: "greetings to you developer",
};

let accesstoken = null;

describe(`messageApi`, () => {
  describe("post /api/messages", () => {
    it("it should create message", (done) => {
      chai
        .request(server)
        .post("/api/messages")
        .send(newMessage)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
describe("GET /api/messages", () => {
  it("it should read all the messages", (done) => {
    chai
      .request(server)
      .get("/api/messages")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });

  it("it should not get all the posts", (done) => {
    chai
      .request(server)
      .get("/api/post")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe("/GET", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send(user)
      .end((err, res) => {
        accesstoken = res.body.token;
        done();
      });
  });
  it("it should GET all messages", (done) => {
    chai
      .request(server)
      .get("/api/messages")
      .set("Authorization", `Bearer ${accesstoken}`)
      .end((err, res) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
});

describe("/GET", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send(user)
      .end((err, res) => {
        accesstoken = res.body.token;
        done();
      });
  });
  it("it should GET a single  message", (done) => {
    chai
      .request(app)
      .get("/api/messages/63c8f115320acee76063cbc8")
      .set("Authorization", `Bearer ${accesstoken}`)
      .end((err, res) => {
        response.should.have.status(200);
        done();
      });
  });
});

describe("/GET", () => {
  beforeEach((done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send(user)
      .end((err, res) => {
        accesstoken = res.body.token;
        done();
      });
  });
  it("it should check a single  message Id", (done) => {
    chai
      .request(server)
      .get("/api/message/63c8f115320acee76063cbc8")
      .set("Authorization", `Bearer ${accesstoken}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});
