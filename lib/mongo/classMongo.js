const clientPromise = require('./index.js');

function classMongo() {
    this.db = null;

    this.findDatabase = async function () {
        const dbConnection = await clientPromise;
        this.db = dbConnection.db("my_item"); // 数据库名
    }

    this.findCollection = async function (tableName) {
        await this.findDatabase();
        const collection = this.db.collection(tableName); // 集合名,相当于表名
        return collection;
    }
}



module.exports = classMongo;
