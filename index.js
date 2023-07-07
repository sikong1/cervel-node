/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-07 11:02:44
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-06 17:57:35
 * @FilePath: \vercel-node-app\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const cors = require('cors')
const api = require('./api');
var { expressjwt: jwt } = require("express-jwt");
const keyObj = require('./key');
const getBody = require('./error/getBody');

const app = express();

// 解决获取不到post请求的body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// token是否过期
app.use(jwt({
  secret: keyObj.myKey,
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/code', '/code/check', '/newToken', '/getMongoData']
}));

// 解决跨域
app.use(cors())

// 路由
api.forEach((route) => {
  app[route.method](route.path, (req, res) => {
    // 判断参数是否存在
    route.errorBody && getBody(req, route.errorBody, res);

    route.handler(req, res);
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
