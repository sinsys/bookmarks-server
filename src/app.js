// Require dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { validateBearerToken } = require('./authenticate');
const { NODE_ENV } = require('./config');

const bookmarksRouter = require('./bookmarks-router');

const app = express();

// Apply middleware
app.use(
  morgan(
    ( NODE_ENV === 'production' )
      ? 'tiny'
      : 'common'
  ),
  helmet(),
  cors(),
  validateBearerToken,
  bookmarksRouter
);

/* //////////////////////////////
Dependencies and setup completed
////////////////////////////// */

// Test root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Error handler
errorHandler = (err, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { 
      error: { 
        message: 'server error' 
      }
    };
  } else {
    console.error(err);
    response = {
      message: err.message, err
    };
  }
  res.status(500).json(response)
};

app.use(errorHandler);

module.exports = app;