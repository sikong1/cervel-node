const getBody = require('../error/getBody');
const jwt = require('jsonwebtoken');
const keyObj = require('../key');

const login = (req, res) => {
  getBody(req, ['username', 'password'], res);
  const { username, password } = req.body;

  // Check if the username and password are valid
  if (username === 'gpw' && password === '123456') {
    // If the credentials are valid, set a cookie and redirect to the home page
    // 状态码
    res.cookie('loggedIn', true);
    const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '1h' });
    res.send({
      message: 'Login successful',
      status: 200,
      token: 'Bearer ' + token,
    })
  } else {
    // If the credentials are invalid, send an error message
    res.send({
      status: 400,
      message: '用户名或密码错误'
    });
  }
};

module.exports = login;