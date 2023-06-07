const jwt = require('express-jwt');
const keyObj = require('../key');

const newToken = (req, res) => {
  const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '1h' });
  res.send({
    status: 200,
    token
  })
};

module.exports = newToken;