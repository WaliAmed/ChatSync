class User {
  constructor() {
    this.userData = {};
  }

  getAllUsers() {
    return {
      status: 200,
      data: this.userData,
    };
  }

  registerUser(user) {
    const { userName, password, confirmPassword } = user;
    if (userName && password && confirmPassword) {
      if (password !== confirmPassword) {
        return {
          status: 500,
          message: "Password didn't match!",
        };
      }

      this.userData[userName] = {
        userName,
        password,
      };

      return {
        status: 200,
        message: "User registered successfully!",
        data: {
          userName,
          password,
        },
      };
    }

    return {
      status: 500,
      message: "User name or password are not correct!",
    };
  }

  loginUser(user) {
    const { userName, password } = user;

    if (
      userName &&
      password &&
      this.userData[userName] &&
      this.userData[userName].password === password
    ) {
      return {
        status: 200,
        message: "Login successful!",
        data: {
          userName,
        },
      };
    }

    return {
      status: 500,
      message: "User name or password are not correct!",
    };
  }
}

module.exports = User;
