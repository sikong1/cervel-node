/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-08-19 12:51:40
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-19 12:55:49
 * @FilePath: \vercel-node-app\api\chat\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { getData } = require('../../modules/chat')

module.exports = [
    {
        path: '/chat/getData',
        method: 'get',
        // errorBody: ['username', 'password'],
        handler: getData,
    },
]