/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 23:39:35
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 14:06:05
 * @FilePath: \vercel-node-app\modules\newToken.js
 * @Description:  生成新的token
 */
const jwt = require('express-jwt');
const keyObj = require('../key');

const newToken = (req, res) => {
  const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '24h' });
  res.send({
    status: 200,
    token
  })
};

module.exports = newToken;