const mongoose = require("mongoose");
var defaultId = mongoose.Types.ObjectId(12345678);
const userSchema = mongoose.Schema({
  userGender: {
    type: String,
    required: { value: true, message: "Gender field is required" },
    trim: true,
    enum: {
      values: ["Male", "Female", "Others"],
      message: "Valid input types for gender are 'Male', 'Female', 'Others'",
    },
  },
  userPurpose: {
    type: String,
    required: { value: true, message: "Purpose field is required" },
    trim: true,
    enum: {
      values: ["Dating", "Relation", "Marriage"],
      message:
        "Valid input types for purpose are 'Dating', 'Relation', 'Marriage'",
    },
  },
  userEmail: {
    type: String,
    required: { value: true, message: "Email field is required" },
    lowercase: true,
    trim: true,
    unique: { value: true, message: "Email should be unique" },
  },
  userPassword: {
    type: String,
    required: { value: true, message: "Password field is required" },
    trim: true,
  },
  userFname: {
    type: String,
    required: { value: true, message: "First name is required" },
    uppercase: true,
    trim: true,
  },
  userLname: {
    type: String,
    required: { value: true, message: "Last name is required" },
    uppercase: true,
    trim: true,
  },
  userInterests: [
    {
      type: String,
      required: { value: true, message: "Interests field is required" },
      trim: true,
    },
  ],
  userPackageId: {
    type: mongoose.Types.ObjectId,
    ref: "packageDetails",
    trim: true,
    default: defaultId,
  },
  userRelationshipStatus: {
    type: String,
    required: { value: true, message: "Relationship status field is required" },
    trim: true,
    enum: {
      values: ["Single", "Divorced", "Widow"],
      message:
        "Valid input types for relationship status are 'Single', 'Divorced', 'Widow'",
    },
  },
  userHaveKids: {
    type: String,
    required: { value: true, message: "Do you have kids? field is required" },
    trim: true,
    enum: {
      values: ["Yes", "No"],
      message: "Do you have kids? Valid input types are 'Yes', 'No'",
    },
  },
  userWantChildren: {
    type: String,
    required: {
      value: true,
      message: "Do you want children? field is required",
    },
    trim: true,
    enum: {
      values: ["Yes", "No"],
      message: "Do you want children? Valid input types are 'Yes', 'No'",
    },
  },
  userHeight: {
    type: String,
    required: { value: true, message: "Height field is required" },
    trim: true,
  },
  userEducationStatus: {
    type: String,
    required: { value: true, message: "Education status field is required" },
    trim: true,
    enum: {
      values: ["High School", "Bachelor's", "Master's", "Phd"],
      message:
        "Valid input types for education status are 'High School', 'Bachelor's', 'Master's', 'Phd'",
    },
  },
  userEthnicity: {
    type: String,
    required: { value: true, message: "Ethnicity field is required" },
    trim: true,
    enum: {
      values: [
        "Asian",
        "Black",
        "Hispanic",
        "Indian",
        "White",
        "North American",
        "Middle Eastern",
        "Other",
      ],
      message:
        "Valid input types for Ethnicity are 'Asian', 'Black', 'Hispanic', 'Indian', 'White', 'North American', 'Middle Eastern', 'Other'",
    },
  },
  userDrink: {
    type: String,
    required: { value: true, message: "Do you drink? field is required" },
    trim: true,
    enum: {
      values: ["Yes", "No", "Occasionally"],
      message:
        "Do you drink? Valid input types are 'Yes', 'No', 'Occasionally'",
    },
  },
  userSmoke: {
    type: String,
    required: { value: true, message: "Do you smoke? field is required" },
    trim: true,
    enum: {
      values: ["Yes", "No", "Occasionally"],
      message:
        "Do you smoke? Valid input types are 'Yes', 'No', 'Occasionally'",
    },
  },
  userProfilePicture: {
    type: String,
    required: { value: true, message: "Profile picture field is required" },
    trim: true,
  },
  userAboutMe: {
    type: String,
    trim: true,
    default: "Not provided",
  },
  userDOB: {
    type: Date,
    required: { value: true, message: "Date-of-birth field is required" },
    trim: true,
    default: "Not provided",
  },
  userLocation: {
    type: String,
    uppercase: true,
    trim: true,
    default: "Not provided",
  },
});

const user = mongoose.model("userDetails", userSchema);

const createUser = async (userObj) => {
  try {
    const createdUser = await user.create(userObj);
    return createdUser;
  } catch (err) {
    if (err.code === 11000) {
      throw { message: "email already registered" };
    } else {
      if (err.name == "ValidationError") {
        for (field in err.errors) {
          throw { message: err.errors[field].message };
        }
      }
    }

    throw { message: err.message };
  }
};

let getUserByEmail = async (userEmail) => {
  try {
    const getuser = await user.findOne(
      { userEmail },
      { userEmail: true, userPassword: true }
    );
    return getuser;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { createUser, getUserByEmail };
