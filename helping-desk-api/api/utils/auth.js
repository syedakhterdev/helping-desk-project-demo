const User = require("../models/userModel");

const jwt = require("jwt-simple");
const { config } = require("./../../config/jwtSecurity");

module.exports.ensureAuthenticated = (req, res, next) => {
  if (!req.header("Authorization")) {
    return res
      .status(401)
      .send({
        message: "Please make sure your request has an Authorization header"
      });
  }
  var token = req.header("Authorization").split(" ")[1];
  var payload = null;
  try {
    payload = jwt.decode(token, config.jwtSecret);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  User.findOne({ where: { user_id: payload.userId } }).then(result => {
    if (result) {
      req.user = result;
      next();
    } else {
      return res.status(401).send({ message: "Invalid Token" });
    }
  });
};
