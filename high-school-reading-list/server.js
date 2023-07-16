var express = require('express');
var path = require('path');
var http = require('http');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// import the routing file to handle the default (index) route
// var index = require('./server/routes/app');
const booksRoutes = require('./server/routes/books');
const authorsRoutes = require('./server/routes/authors');
const logsRoutes = require('./server/routes/logs');
const usersRoutes = require('./server/routes/users');

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/high-school-reading-list',
    { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Connection failed: " + err));

app.use(express.json());
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    // res.setHeader('Access-Control-Allow-Credentials', true); // per https://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-node-js
    next();
  });

  // Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/high-school-reading-list')));

// Tell express to map the default route ('/') to the index route
// app.use('/', index);
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/logs', logsRoutes);
app.use('/users', usersRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/high-school-reading-list/index.html'));
  });

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
