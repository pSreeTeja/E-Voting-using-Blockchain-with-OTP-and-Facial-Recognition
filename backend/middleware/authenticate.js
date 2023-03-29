const jwt = require("jsonwebtoken");
const VoterModel = require("../models/voterModel");
const secret=require("../secret/secret")

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, secret.pass);
    const rootUser = await VoterModel.findOne({ _id: verifyToken._id });
    console.log(rootUser);
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.status = 200;
    next();
  } catch (err) {
    res.status(401).send("unauthorized");
    console.log(err);
  }
};
module.exports = Authenticate;