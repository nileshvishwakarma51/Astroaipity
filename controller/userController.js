const userModelMethod = require("../model/userModel");
const multer = require("multer");
const fs = require("fs");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config/config");

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

const deleteFile = (req) => {
  fs.unlink(req.file.path, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

let createUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.send(err.message);
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

        if (!req.file) {
          return res.send("Profile is required");
        }
        if (!userGender) {
          deleteFile(req);
          return res.send("Gender is required");
        }
        if (!userPurpose) {
          deleteFile(req);
          return res.send("Purpose is required");
        }
        if (!userEmail) {
          deleteFile(req);
          return res.send("Email is required");
        }
        if (!userPassword) {
          deleteFile(req);
          return res.send("Password is required");
        } else {
          if (!userPassword.length >= 8 && userPassword.length <= 16) {
            return res.send(
              "Password length mismatch. Length must be >=8 and <=16"
            ); //validation success
          }

          var salt = bcrypt.genSaltSync(10);
          req.body.userPassword = bcrypt.hashSync(userPassword, salt);
        }
        if (!userFname) {
          deleteFile(req);
          return res.send("First name is required");
        }
        if (!userLname) {
          deleteFile(req);
          return res.send("Last name is required");
        }
        if (!userInterests) {
          deleteFile(req);
          return res.send("Interests is required");
        } else {
          let interestsValues = [
            "Reading",
            "Writing",
            "Sports",
            "Hiking",
            "Movies",
            "Cooking",
            "Singing",
            "Travelling",
            "Painting",
            "Music",
            "Gardening",
            "Socializing",
            "Pets",
            "Meditaion",
            "Running",
          ];
          let message =
            "Valid input types for Interests are 'Reading', 'Writing', 'Sports', 'Hiking', 'Movies', 'Cooking', 'Singing', 'Travelling', 'Painting', 'Music',   'Gardening', 'Socializing',  'Pets',   'Meditaion',    'Running'";
          let userInterests = req.body.userInterests.split(",");
          let isMatch = userInterests.every((item) => {
            if (interestsValues.indexOf(item) != -1) {
              return true;
            }
          });
          if (!isMatch) {
            return res.send(message);
          }
          req.body.userInterests = userInterests;
        }
        if (!userHaveKids) {
          deleteFile(req);
          return res.send("Do you have kids? field is required");
        }
        if (!userWantChildren) {
          deleteFile(req);
          return res.send("Do you want children? field is required");
        }
        if (!userHeight) {
          deleteFile(req);
          return res.send("Height is required");
        }
        if (!userEducationStatus) {
          deleteFile(req);
          return res.send("Education status is required");
        }
        if (!userEthnicity) {
          deleteFile(req);
          return res.send("Ethnicity is required");
        }
        if (!userDrink) {
          deleteFile(req);
          return res.send("Do you drink? field is required");
        }
        if (!userSmoke) {
          deleteFile(req);
          return res.send("Do you smoke? field is required");
        }
        if (!userDOB) {
          deleteFile(req);
          return res.send("DOB is required");
        }
        if (!userLocation) {
          deleteFile(req);
          return res.send("Location is required");
        }
        if (!userRelationshipStatus) {
          deleteFile(req);
          return res.send("Relationship status is required");
        }
        req.body.userProfilePicture = req.file.filename;
        let createdUser = await userModelMethod.createUser(req.body);
        jwt.sign(
          { _id: createdUser._id, userEmail: createdUser.userEmail },
          JWTSecret,{expiresIn:"1800s"},
          (error, token) => {
            if (error) {
              return res.status(500).send(err.message);
            } else {
              return res
                .status(200)
                .send({
                  _id: createdUser._id,
                  userEmail: createdUser.userEmail,
                  token,
                });
            }
          }
        );
      } catch (err) {
        deleteFile(req);
        return res.status(400).send(err);
      }
    }
  });
};

let loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail) {
    return res.send("User email is required");
  }
  if (!userPassword) {
    return res.send("User password is required");
  }
  try {
    let getUser = await userModelMethod.getUserByEmail(userEmail);
    if (!getUser) {
      return res.status(404).send(`Email not registered: ${userEmail}`);
    }
    let isPasswordMatch = bcrypt.compareSync(
      userPassword,
      getUser.userPassword
    );
    if (!isPasswordMatch) {
      return res.status(404).send(`Password is incorrect`);
    }
    jwt.sign(
      { _id: getUser._id, userEmail: getUser.userEmail },
      JWTSecret,{expiresIn:"1800s"},
      (error, token) => {
        if (error) {
          console.log(error);
          return res.status(500).send(err.message);
        } else {
          return res
            .status(200)
            .send({ _id: getUser._id, userEmail: getUser.userEmail, token });
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

let subscribePkg = async (req, res) => {    
  try {     
    let userPackageId = req.body.pkgId;
    let subscribePkg = await userModelMethod.subscribePkg(req._id,userPackageId);  
    return res
    .status(200)
    .send(subscribePkg);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}; 

module.exports = { createUser, loginUser, subscribePkg };
