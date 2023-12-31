const UserService = require("../services/userServices");

const User = new UserService();

/*
@desc get all users
@route POST /api/users/getAllUsers
@access public
*/
const getAllUsers = (req, res) => {
  const user = User.getAllUsers();
  res.status(200).json(user);
};

/*
@desc register user
@route POST /api/users/register
@access public
*/
const registerUser = (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  const user = User.registerUser({
    userName,
    password,
    confirmPassword,
  });

  res.status(200).json(user);
};

/*
@desc login user
@route POST /api/users/login
@access public
*/
const loginUser = (req, res) => {
  const { userName, password } = req.body;

  const user = User.loginUser({
    userName,
    password,
  });

  res.status(200).json(user);
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
