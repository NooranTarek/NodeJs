const mongoose = require('mongoose');

function dbConnection() {
  mongoose.connect('mongodb://127.0.0.1:27017/day4').then(() => {
    console.log('database connected successfully :)');
  }).catch((error) => {
    console.log('database connection failed', error);
  });
}
module.exports = { dbConnection };
