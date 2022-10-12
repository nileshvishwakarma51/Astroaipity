const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userGender: {
    type: String,
    required: true,
    trim: true,
    enum: ["Male", "Female", "Others"],
  },
  userPurpose: {
    type: String,
    required: true,
    trim: true,
    enum: ["Dating", "Relation", "Marriage"],
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 16,
  },
  userName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  userInterests: [
    {
      type: String,
      required: true,
      trim: true,
      enum: [
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
      ],
    },
  ],
  userPackageId: {
    type: mongoose.Types.ObjectId,
    ref: "packageDetails",
    trim: true,
  },
  userRelationshipStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ["Single", "Divorced", "Widow"]
  },
  userAboutMe: {
    type: String,
    trim: true,
  },
  userDOB:{
    type: Date,
    required: true,
    trim: true,
  },
  userLocation:{
    type: String,
    uppercase: true,
    trim: true,
  }
});

const user = mongoose.model("userDetails", userSchema);

const createUser = async (userObj) => {
  console.log("create user ----------> :", userObj);
  try {
    const createdUser = await user.create(userObj);
    return createdUser;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// let getUser = async (userObj) => {
//   try {
//     console.log("get user :", userObj);
//     const getuser = await user
//       .find(userObj, { _id: false, __v: false })
//       .populate("userCollegeId");
//     return getuser;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err.message);
//   }
// };

module.exports = { createUser };
