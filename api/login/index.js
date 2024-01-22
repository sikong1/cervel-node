/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 14:05:10
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2024-01-22 16:59:11
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
        isWhiteList: true,
        errorBody: ['username', 'password'],
        handler: login,
    },
    {
        path: '/getPoint',
        method: 'post',
        isWhiteList: true,
        handler: getPoint,
    },
    {
        path: '/newToken',
        method: 'get',
        isWhiteList: true,
        handler: newToken,
    },
    {
        path: '/code',
        method: 'get',
        isWhiteList: true,
        handler: getCodeObj.getCode,
    },
    {
        path: '/code/check',
        method: 'post',
        isWhiteList: true,
        errorBody: ['captchaType', 'pointJson'],
        handler: getCodeObj.postCodeCheck,
    },
    {
        path: '/getMongoData',
        method: 'get',
        isWhiteList: true,
        handler: getMongoData,
    },
    {
        path: '/register',
        errorBody: ['username', 'password'],
        method: 'post',
        isWhiteList: true,
        handler: register,
    },
]