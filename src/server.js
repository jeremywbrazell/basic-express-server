'use strict'; // JS "strict mode"

const express = require('express');
const app = express();

const validator = require('./middleware/validator');
const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');


app.use(express.json());

app.get('/hello', (req, res) => {
  console.log(req.query); // { name: 'brian', cool: 'fun'}
  res.send('hello world!');
});

app.get('/hello/:person', (req, res) => {
  console.log('name:', req.params.person);
  res.send({ name: req.params.person });
})

app.get('/person', validator, (req, res) => {
    console.log('name:', req.query.name );
})

app.get('/hello/:person/:another', (req, res) => {
  console.log('params', req.params);
  res.send(req.params)
});

app.get('/cool', logger, square(5), (req, res) => {
  console.log(req.squared);
  res.json({ num: req.squared })
});

app.post('/test-post', (req, res) => {
  console.log(req.body);
  res.send('great, cool');
});

function square(n) {
  return (req, res, next) => {
    if (typeof n !== 'number') {
      next('not a number!');
    } else {
      req.squared = n * n;
      next();
    }
  }
}

app.use('*', notFound);

app.use(errors);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`server up: ${port}`);
    });
  }
}
