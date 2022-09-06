const express = require("express");
const userRouter = require("./routes/user.routes");
const empRouter = require("./routes/emp.routes");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/users", userRouter);
app.use("/emps", empRouter);

app.get("/", (req, res) => {
  res.send("hello this is my crud api with user authorization");
});

const mongoose = require("mongoose");
mongoose
  // .connect("mongodb+srv://salaj:test123@cluster0.6du03pb.mongodb.net/test")
  .connect(process.env.DB)
  .then(() => {
    console.log("Success in connecting to your database.");
    app.listen(port, () => {
      console.log(
        `the server is listening on port ${port} through http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
