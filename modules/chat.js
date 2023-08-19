/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 09:23:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-19 14:23:24
 * @FilePath: \vercel-node-app\modules\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const { formatTime } = require("../utils");
const { success } = require("../status");

const getData = async (req, res) => {
    res.send({
        status: success,
        data: {
            content: '这是一条消息',
            type: 'text',
            timestamp: formatTime(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss'),
            // status: 
        }
    });
};

module.exports = {
    getData
};