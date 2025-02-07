const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const Rcon = require('rcon-client').Rcon;
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Mock user for authentication
const users = [{ username: 'admin', password: 'password' }];

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Home route (RCON dashboard)
app.get('/', isAuthenticated, (req, res) => {
  res.render('index', { response: null });
});

// Send RCON command
app.post('/send-command', isAuthenticated, async (req, res) => {
  const { command } = req.body;

  try {
    const rcon = new Rcon({
      host: process.env.RCON_HOST || 'localhost',
      port: parseInt(process.env.RCON_PORT) || 25575,
      password: process.env.RCON_PASSWORD || 'password',
    });

    await rcon.connect();
    const response = await rcon.send(command);
    await rcon.end();

    res.render('index', { response });
  } catch (error) {
    res.render('index', { response: `Error: ${error.message}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
