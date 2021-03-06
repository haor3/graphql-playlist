require('dotenv').config();

const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./server/schema/schema');

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// connect to mlab
mongoose
  .connect(`${process.env.REACT_APP_MONGOURI}`, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('server is running on port 5000');
    });
  })
  .catch(err => console.log(err));
