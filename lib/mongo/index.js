/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 17:13:36
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 11:39:28
 * @FilePath: \vercel-node-app\lib\mongo\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
require('dotenv/config');
const { MongoClient } = require('mongodb');

const uri = process.env["MONGODB_URI"];
console.log(uri, 'uriuriuri');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please set Mongo URI')
}

if (process.env['NODE_ENV'] === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {

    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

// 连接数据库 表
const findDatabase = async function ({ dataBase, tableName }) {
    const newDataBase = dataBase || 'my_item';
    const dbConnection = await clientPromise;
    const db = dbConnection.db(newDataBase); // 数据库名
    const collection = db.collection(tableName);
    return collection;
}

module.exports = { clientPromise, findDatabase };