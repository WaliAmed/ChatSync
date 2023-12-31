const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/usersController");

router.route("/getAllUsers").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
