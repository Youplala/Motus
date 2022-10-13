var jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

function JWTService(secretKey) {
  var methods = {};

  function isObjectNullOrUndefined(object) {
    return object === null || object === undefined;
  }
  function isStringNullOrEmpty(string) {
    return string === null || string === undefined || string === "";
  }

  methods.generateToken = function (configurations) {
    if (isObjectNullOrUndefined(configurations)) {
      throw new Error("configurations is null or undefined");
    }

    return jwt.sign(configurations.data, secretKey, configurations.expireDate);
  };

  methods.isTokenValid = function (token) {
    if (isStringNullOrEmpty(token)) {
      throw new Error("token is null or undefined");
    }

    try {
      jwt.verify(token, secretKey);
      return true;
    } catch (err) {
      return false;
    }
  };
  methods.getTokenData = function (token) {
    if (isStringNullOrEmpty(token)) {
      throw new Error("token is null or undefined");
    }

    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      throw err;
    }
  };
  return methods;
}

module.exports = {JWTService};
