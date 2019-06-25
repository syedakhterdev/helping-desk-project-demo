const express = require("express");
const userCtrl = require("../controllers/userController");
const router = express.Router();
// retrieve all users and create new user
router
  .route("/users")
  .get(userCtrl.list)
  .post(userCtrl.createNewUser);
// Retrieve a single user by id
router.get("/users/:userId", userCtrl.findById);

// delete a user
router.delete("/users/:userId", userCtrl.deleteUser);

module.exports = router;
