/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-05 15:27:56
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 11:38:10
 * @FilePath: \vercel-node-app\modules\getMongo.js
 * @Description: 尝试使用mongodb Atlas
 */
const { findDatabase } = require('../lib/mongo');
const { collectionConfig } = require('../lib/mongo/enum');

async function getMongoData(req, res) {
    const collection = await findDatabase({ tableName: collectionConfig.apothegm.name }); // 连接数据库
    let apos = await collection.find({}).toArray(); // 查询所有数据

    res.send({
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: { apos }
    });
}

module.exports = getMongoData;
