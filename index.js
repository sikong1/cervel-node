const express = require('express');
const cors = require('cors')
const api = require('./api');
var { expressjwt: jwt } = require("express-jwt");
const keyObj = require('./key');

const app = express();

// 解决获取不到post请求的body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// token是否过期
app.use(jwt({
  secret: keyObj.myKey,
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/code', '/code/check', '/newToken']
}));

// 解决跨域
app.use(cors())

// 路由
api.forEach((route) => {
  app[route.method](route.path, (req, res) => {
    route.handler(req, res);
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
