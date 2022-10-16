const userModelMethod = require("../model/userModel");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "profilePicture");
    },
    filename: function (req, file, cb) {
      let fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: function (req, file, cb) {
    let fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (fileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: "Only allowed file types: jpeg, jpg and png" });
    }
  },
}).single("userProfilePicture");

let createUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (req.file) {
      if (err) {
        return res.send(err.message);
      } else {
        try {
          const {
            userGender,
            userPurpose,
            userEmail,
            userPassword,
            userFname,
            userLname,
            userInterests,
            userHaveKids,
            userWantChildren,
            userHeight,
            userEducationStatus,
            userEthnicity,
            userDrink,
            userSmoke,
            userDOB,
            userLocation,
            userRelationshipStatus,
          } = req.body;

          if(!req.file.path){
            return res.send("Something went wrong with profile picture. Please try again!");
          }
          req.body.userProfilePicture = req.file.path;
          if (!userGender) {
            return res.send("Gender is required");
          }
          if (!userPurpose) {
            return res.send("Purpose is required");
          }
          if (!userEmail) {
            return res.send("Email is required");
          }
          if (!userPassword) {
            return res.send("Password is required");
          }
          if (!userFname) {
            return res.send("First name is required");
          }
          if (!userLname) {
            return res.send("Last name is required");
          }
          if (!userInterests) {
            return res.send("Interests is required");
          }
          console.log(userInterests);
          if (!userHaveKids) {
            return res.send("Do you have kids? field is required");
          }
          if (!userWantChildren) {
            return res.send("Do you want kids? field is required");
          }
          if (!userHeight) {
            return res.send("Height is required");
          }
          if (!userEducationStatus) {
            return res.send("Education status is required");
          }
          if (!userEthnicity) {
            return res.send("Ethnicity is required");
          }
          if (!userDrink) {
            return res.send("Do you drink? field is required");
          }
          if (!userSmoke) {
            return res.send("Do you smoke? field is required");
          }
          if (!userDOB) {
            return res.send("DOB is required");
          }
          if (!userLocation) {
            return res.send("Location is required");
          }
          if (!userRelationshipStatus) {
            return res.send("Relationship status is required");
          }
          

          let createdUser = await userModelMethod.createUser(req.body);
          res.status(200).send(`user signup Sucessfull:\n ${createdUser}`);
        } catch (err) {
          res.status(400).send(err);
        }
      }
    } else {
      res.send("Profile picture is required");
    }
  });
};

module.exports = { createUser };
