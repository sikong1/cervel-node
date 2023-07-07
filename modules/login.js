/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 09:23:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 12:05:43
 * @FilePath: \vercel-node-app\modules\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('jsonwebtoken');
const keyObj = require('../key');
const { findDatabase } = require('../lib/mongo');
const { collectionConfig } = require('../lib/mongo/enum');

const login = async (req, res) => {
  const { username, password } = req.body;
  // 从数据库中表
  const collection = await findDatabase({ tableName: collectionConfig.user_sign_in.name });
  // 查询name为gpw的password
  let apos = await collection.find({ username: username }).toArray();
  // 如果没有查询到
  if (apos.length === 0) {
    res.send({ status: 400, msg: '用户名不存在' });
    return;
  }
  // 如果查询到的密码和输入的密码不一致
  if (apos[0].password !== password) {
    res.send({ status: 400, msg: '密码错误' });
    return;
  }
  // 如果查询到的密码和输入的密码一致
  // 生成token
  console.log('tokentoken');
  const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '24h' });
  res.send({
    message: 'Login successful',
    status: 200,
    token: 'Bearer ' + token,
  });
};

module.exports = login;