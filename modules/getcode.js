/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-08 09:33:41
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 15:49:32
 * @FilePath: \vercel-node-app\modules\getcode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const repData = require('../data/repData');
const repDataClick = require('../data/repDataClick');
const { aesDecrypt, generateRandomString, isMatch, isInterior, getClickData, successData, errorData } = require('../utils/crypot');
const { LoginEnum } = require('../enum');


let codeKey = null
const getCode = (req, res) => {
  // 获取当前验证类型
  const { captchaType } = req.query;
  switch (captchaType) {
    case LoginEnum.blockPuzzle.name:
      send(res, repData);
      break;
    case LoginEnum.clickWord.name:
      send(res, repDataClick);
      break;
    default:
      res.send(errorData);
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
  console.log(pointJsonStr, 'pointJsonStrpointJsonStr');
  switch (captchaType) {
    case LoginEnum.blockPuzzle.name:
      // 验证
      isPointJson = isMatch(repData, pointJsonStr);
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
          if (!isInterior(item.x, repDataClick.num[index].x)) {
            isPointJson = false;
          }
          if (!isInterior(item.y, repDataClick.num[index].y)) {
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