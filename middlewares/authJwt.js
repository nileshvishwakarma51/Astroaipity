const jwt = require("jsonwebtoken");
const { JWTSecret} = require("../config/config");

const authJwt = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, JWTSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized access!"
            });
        }
        req._id = decoded._id;
        next();
    });
};


module.exports = authJwt;