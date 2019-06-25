const User = require("../models/userModel");
const jwt = require("jwt-simple");
const { config } = require("./../../config/jwtSecurity.js");

// for login
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { user_email: email, user_passsword: password } }).then(
    result => {
      if (result) {
        let payload = {
          userId: result.user_id,
          organizationId: result.organizaion_id
        };
        let token = jwt.encode(payload, config.jwtSecret);
        let userProfile = {
          userName: result.user_id,
          userEmail: result.user_email,
          userRole: result.user_role,
          organizationId: result.organizaion_id
        };
        return res.send({ token, userProfile });
      } else {
        return res.send({ token: null });
      }
    }
  );
};
