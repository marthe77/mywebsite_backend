const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer")

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My website Api project",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(console.log("database connected to mongodb"))
  .catch((err) => console.log(err));


  // const storage = multer.diskStorage({
  //   destination:(req,file,cb)=>{
  //     cb(null,"images")
  //   },filename:(req,file,cb)=>{
  //     cb(null,req.body.name)
  //   }
  // })
  // const upload = multer({storage:storage})
// middlewares and routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);



// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(5000, () => {
  console.log("backend is running.");
});
