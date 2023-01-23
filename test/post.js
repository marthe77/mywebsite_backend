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

let accesstoken = null;
describe(`PostApi`, () => {
  //test the get route
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
  describe("GET /api/posts", () => {
    it("it should get all the posts", (done) => {
      chai
        .request(server)
        .get("/api/posts")
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

  describe("GET /api/posts/:id", () => {
    it("it should get a post by id", (done) => {
      const id = "63b696e18c84a4c2b7a304cf";
      chai
        .request(server)
        .get(`/api/posts/${id}`)
        .set("Authorization", `Bearer ${accesstoken}`)
        .end((err, response) => {
          // console.log(response)
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("it should not get a post", (done) => {
      chai
        .request(server)
        .get("/api/post/")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  //test to create post
  describe("post /api/posts", () => {
    it("it should update a post", (done) => {
      chai
        .request(server)
        .post("/api/posts")
        .set("Authorization", `Bearer ${accesstoken}`)
        .send({
          username: "qweqrt",
          title: "hello",
          desc: "greetings",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
//update post
describe("PUT /api/posts/:ID", () => {
  it("it should update post", (done) => {
    const id = "63b696e18c84a4c2b7a304cf";
    chai
      .request(server)
      .put(`/api/posts/${id}`)
      .set("Authorization", `Bearer ${accesstoken}`)
      .send({
        username: "werrr",
        title: "hey",
        desc: "morning",
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});
describe("delete /api/posts/:ID", () => {
  it("it should delete post", (done) => {
    const id = "63b696e18c84a4c2b7a304cf";
    chai
      .request(server)
      .delete(`/api/posts/${id}`)
      .set("Authorization", `Bearer ${accesstoken}`)
      .send({
        username: "werrr",
        title: "hey",
        desc: "morning",
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});
