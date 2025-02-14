/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-05 15:27:56
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 11:38:10
 * @FilePath: \vercel-node-app\modules\getMongo.js
 * @Description: 获取用户信息
 */
const ObjectId = require("mongodb").ObjectId
const { findDatabase } = require("../../lib/mongo")
const { collectionConfig } = require("../../lib/mongo/enum")

async function getItemData(req, res) {
  const { id } = req.query
  const collection = await findDatabase({
    tableName: collectionConfig.articles.name
  }) // 连接数据库
  let apos = await collection.find({ _id: new ObjectId(id) }).toArray()

  if (!apos.length) {
    returnres.send({ status: 404001, msg: "文章不存在" })
  }

  res.send({ status: 200, data: apos[0] })
}

module.exports = getItemData
