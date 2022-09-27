'use strict';

const express = require('express');
require('dotenv').config();
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const userRouter = require('./auth/router.js');
const PORT = process.env.PORT || 3002;


// design principle:  singleton
const app = express();
app.use(express.json());
app.use(userRouter);


app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});


app.get('/bad', (req, res, next) => {
  next('this is a bad route');
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start};
