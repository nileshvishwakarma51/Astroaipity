const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authJWT = require("../middlewares/authJwt")

router.post("/signup", userController.createUser);
router.post("/login",  userController.loginUser);

router.all('/*', function (req, res) {
    res.status(404).send("Requested resource for user not found");
  })
module.exports = router;
