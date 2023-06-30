/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-30 11:53:25
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-06-30 13:59:59
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


module.exports = {
    aesDecrypt,
    generateRandomString
}