const getBody = require('../error/getBody');
const jwt = require('jsonwebtoken');
const keyObj = require('../key');

const login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'gpw' && password === '123456') {
    // 状态码
    res.cookie('loggedIn', true);
    const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '1h' });
    res.send({
      message: 'Login successful',
      status: 200,
      token: 'Bearer ' + token,
    })
  } else {
    res.send({
      status: 400,
      message: '用户名或密码错误'
    });
  }
};

module.exports = login;