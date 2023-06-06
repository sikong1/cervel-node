const express = require('express');
const cors = require('cors')
const api = require('./api');

const app = express();

// 解决获取不到post请求的body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors())


api.forEach((route) => {
  app[route.method](route.path, (req, res) => {
    route.handler(req, res);
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
