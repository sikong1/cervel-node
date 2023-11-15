/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-07 09:45:24
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-15 09:55:07
 * @FilePath: \vercel-node-app\modules\user_sign_in.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { findDatabase } = require('../lib/mongo');
const { collectionConfig } = require('../lib/mongo/enum');
const { formatTime } = require('../utils');
const { aesDecrypt } = require('../utils/crypot');

async function register(req, res) {
    // 获取接口参数
    const { username, password, phone, key } = req.body;

    const collection = await findDatabase({ tableName: collectionConfig.user_sign_in.name }); // 连接数据库
    // 查询username是否存在
    let apos = await collection.find({ username: username }).toArray();
    if (apos.length !== 0) {
        res.send({ status: 400, msg: '账号已存在!' });
        return;
    }

    // 解密
    let pointJsonStr = JSON.parse(aesDecrypt(password, key));

    // 插入数据
    const time = new Date().getTime();
    const updateTime = formatTime(time, 'yyyy-MM-dd HH:mm:ss');
    apos = await collection.insertOne({ username, password: pointJsonStr, phone, updateTime });
    if (!apos.acknowledged) {
        res.send({ status: 400, msg: '注册失败' });
        return;
    }
    res.send({ status: 200, msg: '注册成功' });
}

module.exports = register;
