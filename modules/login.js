/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 09:23:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-15 09:54:28
 * @FilePath: \vercel-node-app\modules\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('jsonwebtoken');
const keyObj = require('../key');
const { findDatabase } = require('../lib/mongo');
const { collectionConfig } = require('../lib/mongo/enum');
const { aesDecrypt } = require('../utils/crypot');
const { delPassWord } = require('../utils');

const login = async (req, res) => {
  const { username, password, phone, key } = req.body;
  // 从数据库中表
  const collection = await findDatabase({ tableName: collectionConfig.user_sign_in.name });
  // 查询name为gpw的password
  let apos = await collection.find({ username: username }).toArray();
  console.log('apos',apos);
  // 如果没有查询到
  if (apos.length === 0) {
    res.send({ status: 400, msg: '账号不存在' });
    return;
  }
  // 解密
  let pointJsonStr = JSON.parse(aesDecrypt(password, key));
  // 如果查询到的密码和输入的密码不一致
  if (apos[0].password !== pointJsonStr) {
    res.send({ status: 400, msg: '密码错误' });
    return;
  }
  // 如果查询到的密码和输入的密码一致
  // 生成token
  console.log('tokentoken');
  const token = jwt.sign({ username }, keyObj.myKey, { expiresIn: '24h' });
  const data = delPassWord(apos)

  res.send({
    message: "Login successful",
    status: 200,
    token: "Bearer " + token,
    userInfo: data[0]
  })
};

module.exports = login;