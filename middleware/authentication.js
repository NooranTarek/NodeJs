/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
  const { token } = req.body;
  jwt.verify(token, 'nooran', async (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'error in token or token not provided or user id in token not exist', err });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = { isAuth };
