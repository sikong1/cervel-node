/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-05 15:27:56
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 11:38:10
 * @FilePath: \vercel-node-app\modules\getMongo.js
 * @Description: 获取用户信息
 */
const { findDatabase } = require("../../lib/mongo")
const { collectionConfig } = require("../../lib/mongo/enum")

async function getData(req, res) {
  const collection = await findDatabase({
    tableName: collectionConfig.articles.name
  }) // 连接数据库
  let apos = await collection.find({}).toArray()

  res.send({ status: 200, data: apos })
}

module.exports = getData
