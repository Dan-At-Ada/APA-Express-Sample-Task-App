const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const User = require('./models/user');

const app = express();

const indexRouter = require('./routes/index');

// Set Pug as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
// app.use('/', require('./routes/index')); // This is an alternative way to include the index route, do you think it's better?

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;
