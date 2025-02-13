/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-05 15:27:56
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 11:38:10
 * @FilePath: \vercel-node-app\modules\getMongo.js
 * @Description: 获取用户信息
 */
const { findDatabase } = require("../lib/mongo")
const { collectionConfig } = require("../lib/mongo/enum")
const { delPassWord } = require("../utils")
const { statusCode } = require("../utils/api-utils")

async function getUserInfo(req, res) {
  const { username, password, phone, key } = req.query
  console.log(username, "username")

  const collection = await findDatabase({
    tableName: collectionConfig.user_sign_in.name
  }) // 连接数据库
  let apos = await collection.find({ username: username }).toArray() // 查询所有数据
  if (apos.length !== 1)  {
    return res.send({
      status: statusCode.errorStatus,
      msg: "用户不存在或者服务端异常"
    })
  }
  //   去除密码
  const data = delPassWord(apos)
  console.log(data, "data")

  res.send({
    status: statusCode.successStatus,
    data: data[0]
  })
}

module.exports = getUserInfo
