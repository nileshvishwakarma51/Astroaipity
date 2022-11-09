const express = require("express");
const router = express.Router();
const packageController = require("../controller/packageController");
const authJWT = require("../middlewares/authJwt")

router.get("/getAllPkg", packageController.getAllPackages);


router.all('/*', function (req, res) {
    res.status(404).send("Requested resource for packages not found");
  })
module.exports = router;
