/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-30 11:53:25
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-04 15:52:29
 * @FilePath: \vercel-node-app\utils\crypot.js
 * @Description: 加解密
*/
const Crypto = require('crypto-js');

/**
 * @captchaType objct 要解密的内容
 * @pointJson String  服务器随机返回的关键字
 **/
function aesDecrypt(encrypted, keyWord = 'XwKsGlMcdPMEhR1B') {
    let key = Crypto.enc.Utf8.parse(keyWord);
    let decrypt = Crypto.AES.decrypt(encrypted, key, { mode: Crypto.mode.ECB, padding: Crypto.pad.Pkcs7 });
    return Crypto.enc.Utf8.stringify(decrypt).toString();
}


function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// 验证前端滑块是否匹配
const isMatch = (repData, pointJsonStr) => {
    const num = repData.num;
    const currentNum = Math.round(Number(pointJsonStr.split(':')[1].split(',')[0]))
    if (num + 5 >= currentNum && currentNum >= num - 5) {
        return true
    } else {
        return false
    }
}

const maxNum = 15
const isInterior = (num, currentNum) => {
    if (num + maxNum >= currentNum && currentNum >= num - maxNum) {
        return true
    } else {
        return false
    }
}

// 获取点击验证的数据
const getClickData = (data) => {
    const arr = [];
    data.split('}').map(item => {
        const str = item.split(':')
        if (str.length < 3) {
            return
        }
        arr.push({
            x: Number(String(str[1]).split(',')[0]),
            y: Number(str[2]),
        })
    })
    return arr
}

const errorData = {
    code: 0,
    data: {
        "repCode": "0001",
        "repMsg": null,
        repData: null,
        "success": false
    }
}

const successData = (captchaType, pointJson) => {
    return {
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
    }
}


module.exports = {
    aesDecrypt,
    generateRandomString,
    isMatch,
    isInterior,
    getClickData,
    successData,
    errorData
}