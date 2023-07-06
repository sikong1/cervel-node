/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 09:23:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 17:00:13
 * @FilePath: \vercel-node-app\modules\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getBody = require('../error/getBody');
const jwt = require('jsonwebtoken');
const keyObj = require('../key');

const login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'gpw' && password === '123456') {
    // 状态码
    res.cookie('loggedIn', true);
    const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '24h' });
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