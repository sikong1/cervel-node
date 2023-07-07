/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 14:05:10
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 17:56:43
 * @FilePath: \vercel-node-app\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const login = require('./modules/login');
const getPoint = require('./modules/getPoint');
const newToken = require('./modules/newToken');
const getMongoData = require('./modules/getMongo');
const getCodeObj = require('./modules/getcode');
module.exports = [
  {
    path: '/',
    method: 'get',
    handler: (req, res) => {
      res.send('Home Page Route')
    }
  },
  {
    path: '/about',
    method: 'get',
    handler: (req, res) => {
      res.send('about Page Route')
    }
  },
  {
    path: '/portfolio',
    method: 'get',
    handler: (req, res) => {
      res.send('portfolio Page Route')
    }
  },
  {
    path: '/contact',
    method: 'get',
    handler: (req, res) => {
      res.send('contact Page Route')
    }
  },
  {
    path: '/login',
    method: 'post',
    errorBody:  ['username', 'password'],
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
    errorBody:  ['captchaType', 'pointJson'],
    handler: getCodeObj.postCodeCheck,
  },
  {
    path: '/getMongoData',
    method: 'get',
    handler: getMongoData,
  },
]