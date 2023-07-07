/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 14:05:10
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 14:16:54
 * @FilePath: \vercel-node-app\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const login = require('../../modules/login');
const getPoint = require('../../modules/getPoint');
const newToken = require('../../modules/newToken');
const getMongoData = require('../../modules/getMongo');
const getCodeObj = require('../../modules/getcode');
const register = require('../../modules/user_sign_in');
module.exports = [
    {
        path: '/login',
        method: 'post',
        errorBody: ['username', 'password'],
        handler: login,
    },
    {
        path: '/getPoint',
        method: 'post',
        handler: getPoint,
    },
    {
        path: '/newToken',
        method: 'get',
        handler: newToken,
    },
    {
        path: '/code',
        method: 'get',
        handler: getCodeObj.getCode,
    },
    {
        path: '/code/check',
        method: 'post',
        errorBody: ['captchaType', 'pointJson'],
        handler: getCodeObj.postCodeCheck,
    },
    {
        path: '/getMongoData',
        method: 'get',
        handler: getMongoData,
    },
    {
        path: '/register',
        errorBody: ['username', 'password', 'phone'],
        method: 'post',
        handler: register,
    },
]