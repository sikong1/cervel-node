const repData = require('../data/repData');
const getBody = require('../error/getBody');

let codeKey = null
const getCode = (req, res) => {
  // 设置一个随机秘钥（英文），每次请求都不一样
  codeKey = Math.random().toString(36).substr(2);
  repData.secretKey = codeKey;
  res.send({
    code: 0,
    data: {
      "repCode": "0000",
      "repMsg": null,
      repData,
      "success": true
    }
  })
}

// 选择验证方式，‘’为点选，blockPuzzle：为拖动
const postCodeCheck = (req, res) => {
  getBody(req, ['captchaType', 'pointJson'], res);
  const { captchaType, pointJson } = req.body;
  console.log(captchaType,'captchaTypecaptchaTypecaptchaType');
  if (captchaType === 'blockPuzzle') {
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
    res.send({
      code: 0,
      data: {
        "repCode": "0001",
        "repMsg": null,
        repData: null,
        "success": true
      }
    })
  }
}

module.exports = {
  getCode,
  postCodeCheck
};