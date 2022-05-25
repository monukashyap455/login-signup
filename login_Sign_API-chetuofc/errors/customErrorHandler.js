class errorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static validationError(status = 402, message = "All Fields Are Required") {
    return new errorHandler(status, message);
  }

  static notFound(status = 404, message = "Page Not Found") {
    return new errorHandler(status, message);
  }
}

module.exports = errorHandler;
