const mongoose = require("mongoose");
const packageSchema = mongoose.Schema({
  pkgName: {
    type: String,
    required: true,
    trim: true,
  },
  pkgDuration: {
    type: String,
    required: true,
    trim: true,
  },
  pkgPrice: {
    type: String,
    trim: true,
  },
  pkgFeatures: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
});

const package = mongoose.model("packageDetails", packageSchema);

let getAllPackages = async () => {
  try {
    // --------------------to insert new package--------------
    // await package.insertMany([{
    //   pkgName: "Platinum Star",
    //   pkgDuration: "18 months",
    //   pkgPrice: "$360",
    //   pkgFeatures: [
    //     "View unlimited photo’s",
    //     "Unlimited messaging",
    //     "See who viewed your profile",
    //     "Geo search",
    //     "Detailed astrological profile",
    //   ],
    // }]);
    const allPackages = await package.find();
    return allPackages;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

module.exports = { getAllPackages };
