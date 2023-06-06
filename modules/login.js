const login = (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json({ error: 'Username or password is missing' });
    return;
  }

  const { username, password } = req.body;

  // Check if the username and password are valid
  if (username === 'gpw' && password === '123456') {
    // If the credentials are valid, set a cookie and redirect to the home page
    // 状态码
    res.cookie('loggedIn', true);
    res.send({
      message: 'Login successful',
      status: 200,
    })
  } else {
    // If the credentials are invalid, send an error message
    res.status(401).send('Invalid username or password');
  }
};

module.exports = login;