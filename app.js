const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, dbUrl } = require("./config/config");
const userRouter = require("./routes/user.routes");
mongoose.connect(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

app.all('/*', function (req, res) {
  res.status(404).send("Requested resource not found");
})

app.listen(PORT, (err, res) => {
  if (err) {
    console.log("Unable to start the server");
  } else {
    console.log(`Server is up and running at port ${PORT}`);
  }
});
