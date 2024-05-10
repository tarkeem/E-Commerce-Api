const jwt = require('jsonwebtoken');

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPAIRE,
  });

module.exports = createToken;
