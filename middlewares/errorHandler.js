const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  const errorMessage = {
    [constants.NOT_FOUND]: {
      title: "Not Found",
      message: err.message,
      stackTrace: err.stack,
    },
    [constants.VALIDATION_ERROR]: {
      title: "Validation Error",
      message: err.message,
      stackTrace: err.stack,
    },
    [constants.FORBIDDEN]: {
      title: "Forbidden Request",
      message: err.message,
      stackTrace: err.stack,
    },
    [constants.UNAUTHORIZED]: {
      title: "Unauthorized Request",
      message: err.message,
      stackTrace: err.stack,
    },
    [constants.SERVER_ERROR]: {
      title: "SERVER ERROR!",
      message: err.message,
      stackTrace: err.stack,
    },
  };

  res.json(
    errorMessage[statusCode] || {
      title: "Error!",
      error: err.message,
      stackTrace: err.stack,
    }
  );
};

module.exports = errorHandler;
