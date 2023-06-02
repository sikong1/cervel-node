const express = require('express');

const app = express();

const origin = (res) => {
  // 解决跨域问题
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
}

app.get('/', (req, res) => {
  res.send('Home Page Route')
  origin(res)
});

app.get('/about', (req, res) => {
  res.send('About Page Route')
  origin(res)
});

app.get('/portfolio', (req, res) => {
  res.send('Portfolio Page Route')
  origin(res)
});

app.get('/contact', (req, res) => {
  res.send('Contact Page Route')
  origin(res)
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
