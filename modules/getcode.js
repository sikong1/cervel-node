/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-08 09:33:41
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 21:16:22
 * @FilePath: \vercel-node-app\modules\getcode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const repData = require('../data/repData');
const repDataClick = require('../data/repDataClick');
const { aesDecrypt, generateRandomString, isMatch, isInterior, getClickData, successData, errorData } = require('../utils/crypot');
const { LoginEnum } = require('../enum');
const { findDatabase } = require('../lib/mongo');
const { collectionConfig } = require('../lib/mongo/enum');


let codeKey = null
let repData = null
const dataObj = {

}
const getCode = async (req, res) => {
  // 获取当前验证类型
  const { captchaType } = req.query;
  switch (captchaType) {
    case LoginEnum.blockPuzzle.name:
      // 连接数据库
      await joinDatabase(res, collectionConfig.code.name);
      break;
    case LoginEnum.clickWord.name:
      // send(res, repDataClick);
      joinDatabase(res, collectionConfig.code_check.name)
      break;
    default:
      res.send(errorData);
  }
}

const joinDatabase = async (res, tableName) => {
  const collection = await findDatabase({ tableName }); // 连接数据库
  let apos = await collection.find({}).toArray(); // 查询所有数据
  if (apos.length > 0) {
    const random = Math.floor(Math.random() * apos.length);
    repData = apos[random];
    dataObj.num = repData.num;
    repData.num = 0
    send(res, repData);
  }
}

const send = (res, data) => {
  // crypto-js 的秘钥 16位数字母
  codeKey = generateRandomString(16);
  data.secretKey = codeKey;
  res.send({
    code: 0,
    data: {
      "repCode": "0000",
      "repMsg": null,
      repData: {
        ...data,
        num: 0
      },
      "success": true,
    }
  })
}

// 选择验证方式，‘’为点选，blockPuzzle：为拖动
const postCodeCheck = (req, res) => {
  const { captchaType, pointJson } = req.body;
  console.log(captchaType, pointJson, 'captchaType, pointJson');
  if (typeof pointJson !== 'string') {
    return res.send(errorData)
  }
  let isPointJson = true;
  // 解密
  let pointJsonStr = aesDecrypt(pointJson, codeKey);
  switch (captchaType) {
    case LoginEnum.blockPuzzle.name:
      // 验证
      isPointJson = isMatch(dataObj.num, pointJsonStr);
      if (!isPointJson) { // 验证失败
        return res.send(errorData)
      }
      res.send(successData(captchaType, pointJson));
      break;
    case LoginEnum.clickWord.name:
      pointJsonStr = JSON.parse(pointJsonStr);
      // 验证
      pointJsonStr = getClickData(pointJsonStr);
      if (Array.isArray(pointJsonStr)) {
        pointJsonStr.forEach((item, index) => {
          if (!isInterior(item.x, dataObj.num[index].x)) {
            isPointJson = false;
          }
          if (!isInterior(item.y, dataObj.num[index].y)) {
            isPointJson = false;
          }
        })
      }
      if (!isPointJson) { // 验证失败
        return res.send(errorData)
      }
      res.send(successData(captchaType, pointJson));
      break;
    default:
      res.send(errorData);
  }
}

module.exports = {
  getCode,
  postCodeCheck
};