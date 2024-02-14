/* eslint-disable radix */
const bcrypt = require('bcrypt');

const hashFunction = ({ plainText, saltRound = process.env.Rounds } = {}) => {
  const hash = bcrypt.hashSync(plainText, parseInt(saltRound));
  return hash;
};
const compareFunction = ({ plainText, hash } = {}) => {
  const match = bcrypt.compare(plainText, hash);
  return match;
};
module.exports = { hashFunction, compareFunction };
