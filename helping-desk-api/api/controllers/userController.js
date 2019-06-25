const User = require("../models/userModel");
const Organization = require("../models/organizationModel");
// list all users
exports.list = function(req, res) {
  User.findAll({ include: [Organization] }).then(result => {
    res.send(result);
  });
};
// create New User
exports.createNewUser = (req, res) => {
  const user = new User(req.body);
  user.save().then((result, err) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(true);
  });
};
// Retrieve single user

exports.findById = function(req, res) {
  User.findByPk(req.params.userId).then(user => {
    res.send(user);
  });
};

// delete user
exports.deleteUser = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: { user_id: id }
  }).then(result => {
    res.send(true);
  });
};
