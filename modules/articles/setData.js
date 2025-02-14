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

const categories = [
  { label: "前端开发", value: "1" },
  { label: "后端开发", value: "2" },
  { label: "开发工具", value: "3" },
  { label: "技术分享", value: "4" }
]

async function setData(req, res) {
  const { title, type, bgImg, content, abstract,userId, username, tag } = req.body
  console.log("type", type)
  const item = categories.find((item) => item.value === type)
  const typeName = item ? item.label : ""
  const obj = {
    title,
    type,
    typeName,
    bgImg,
    content,
    abstract,
    username,
    userId,
    tag
  }

  const collection = await findDatabase({
    tableName: collectionConfig.articles.name
  }) // 连接数据库
  let apos = await collection.insertOne(obj)

  if (!apos.acknowledged) {
    res.send({ status: 400, msg: "文章添加失败" })
    return
  }
  res.send({ status: 200, msg: "文章添加成功" })
}

module.exports = setData
