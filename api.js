const login = require('./modules/login');
const getPoint = require('./modules/getPoint');
const newToken = require('./modules/newToken');
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
    handler: getCodeObj.postCodeCheck,
  },
]