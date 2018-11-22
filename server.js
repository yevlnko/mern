const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');

const items = require('./routes/api/items');


const app = express();

// Body parser Middleware
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {
  
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // Pass to next layer of middleware
  next();
});

// DB config
const db = require('./config/keys').mongoURL;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('Mongo DB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});