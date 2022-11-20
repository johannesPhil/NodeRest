/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test Database');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is a Production Database');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', bookRouter);
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.server = app.listen(port, () => {
  console.log(`Server Listening on port: ${port}`);
});

module.exports = app;
