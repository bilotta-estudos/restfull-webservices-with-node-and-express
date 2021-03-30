const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
if (process.env.ENV === 'Test') {
  console.log('Conexão com o banco de dados realizada com sucesso! [TESTE]');
  const db = mongoose.connect('mongodb://localhost/bookAPITest');
} else {
  console.log('Conexão com o banco de dados realizada com sucesso! [PRODUÇÃO]');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const Book = require('./models/bookModel');

const port = process.env.PORT || 3000;
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Aplicação sendo executada na porta: ${port}`);
});

module.exports = app;
