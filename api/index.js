/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-07 09:48:46
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-19 12:54:57
 * @FilePath: \vercel-node-app\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const login = require('./login');
const user = require('./user');
const defaultApi = require('./default');
const chat = require('./chat');

module.exports = [
    ...login,
    ...user,
    ...defaultApi,
    ...chat
]