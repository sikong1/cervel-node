// const getBody = require('../error/getBody');
// const mammoth = require('mammoth');
const point = require('../data/point');

const getHtml = (req, res) => {
  try {
    res.send({
      status: 200,
      data: point,
    })
  } catch (error) {
    console.error(error);
  }
}

module.exports = getHtml;