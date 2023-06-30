/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-08 09:33:41
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-30 14:59:09
 * @FilePath: \vercel-node-app\modules\getcode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const repData = require('../data/repData');
const { aesDecrypt, generateRandomString } = require('../utils/crypot');

const errorData = {
  code: 0,
  data: {
    "repCode": "0001",
    "repMsg": null,
    repData: null,
    "success": false
  }
}

let codeKey = null
const getCode = (req, res) => {
  // crypto-js 的秘钥 16位数字母
  codeKey = generateRandomString(16);
  repData.secretKey = codeKey;
  res.send({
    code: 0,
    data: {
      "repCode": "0000",
      "repMsg": null,
      repData: {
        ...repData,
        num: 0
      },
      "success": true,
    }
  })
}

// 选择验证方式，‘’为点选，blockPuzzle：为拖动
const postCodeCheck = (req, res) => {
  const { captchaType, pointJson } = req.body;
  let isPointJson = false;
  if (typeof pointJson === 'string') {
    // 解密
    const pointJsonStr = aesDecrypt(pointJson, codeKey);
    const num = repData.num;
    const currentNum = Math.round(Number(pointJsonStr.split(':')[1].split(',')[0]))
    if (num + 5 >= currentNum &&  currentNum >= num - 5) {
      isPointJson = true;
    } else {
      return res.send(errorData)
    }
  }
  console.log(captchaType === 'blockPuzzle' && isPointJson, 'vvv');
  if (captchaType === 'blockPuzzle' && isPointJson) {
    res.send({
      code: 0,
      data: {
        "repCode": "0000",
        "repMsg": null,
        repData: {
          "captchaId": null,
          "projectCode": null,
          "captchaType": captchaType,
          "captchaOriginalPath": null,
          "captchaFontType": null,
          "captchaFontSize": null,
          "secretKey": null,
          "originalImageBase64": null,
          "point": null,
          "jigsawImageBase64": null,
          "wordList": null,
          "pointList": null,
          pointJson,
          "result": true,
          "captchaVerification": null,
          "clientUid": null,
          "ts": null,
          "browserInfo": null
        },
        "success": true
      }
    })
  } else {
    res.send(errorData)
  }
}

module.exports = {
  getCode,
  postCodeCheck
};