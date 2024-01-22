/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-07 11:02:44
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2024-01-22 16:57:18
 * @FilePath: \vercel-node-app\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const cors = require('cors')
const api = require('./api');
var { expressjwt: jwt } = require("express-jwt");
const keyObj = require('./key');
const getBody = require('./error/getBody');
var wsRouter = require('./modules/ws');


const app = express();
const expressWs = require("express-ws")
expressWs(app)
console.log('api', api);
app.ws('/test', wsRouter);

// 解决获取不到post请求的body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const isTokenArr = []
api.forEach(item => {
  if (item.isWhiteList) {
    isTokenArr.push(item.path)
  }
})

// token是否过期
app.use(jwt({
  secret: keyObj.myKey,
  algorithms: ['HS256']
}).unless({
  path: isTokenArr
}));
console.log(isTokenArr,'isTokenArr')
// app.use('/wss', wsRouter);

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
