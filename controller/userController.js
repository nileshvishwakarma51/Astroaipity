const userModelMethod = require("../model/userModel");

let createUser = async (req, res) => {
  try {
    let userObj = {};
    if (
      req.body.userGender &&
      req.body.userPurpose &&
      req.body.userEmail &&
      req.body.userPassword &&
      req.body.userName &&
      req.body.userInterests &&
      req.body.userRelationshipStatus
    ) {
      userObj.userName = req.body.userName;
      userObj.userPurpose = req.body.userPurpose;
      userObj.userEmail = req.body.userEmail;
      userObj.userPassword = req.body.userPassword;
      userObj.userInterests = req.body.userInterests;
      userObj.userGender = req.body.userGender;
      userObj.userRelationshipStatus = req.body.userRelationshipStatus;
      userObj.userAboutMe = req.body.userAboutMe;
      userObj.userDOB = req.body.userDOB;
      userObj.userLocation = req.body.userLocation;
    } else {
      return res.send(
        `userName, userPurpose, userEmail, userPassword, userInterests, userGender, userRelationshipStatus are required field`
      );
    }

    console.log("user ka object---------->", userObj);

    let createdUser = await userModelMethod.createUser(userObj);
    res.send(`user signup Sucessfull:\n ${createdUser}`);
  } catch (err) {
    res.send(`Unable to signup user :\n ${err}`);
  }
};

module.exports = { createUser };
