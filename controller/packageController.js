const packageModelMethod = require("../model/PackageModel");

let getAllPackages = async (req, res) => {    
    try {        
      let allPackages = await packageModelMethod.getAllPackages();  
      return res
      .status(200)
      .send(allPackages);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  module.exports = {getAllPackages };