const isBody = (req, array) => {
  array.forEach(item => {
    if (!req.body || !req.body[item]) {
      const itemStr = array.join(' or ');
      res.status(400).json({ error: itemStr + 'is missing' });
      return;
    }
  })
}

module.exports = isBody;