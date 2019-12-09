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

// connect to mlab
mongoose
  .connect(
    'mongodb+srv://admin:w1CWzPHWOK50a31s@cluster0-gvc4u.gcp.mongodb.net/graphql-playlist?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true },
  )
  .then(() => {
    console.log('Connected to database');
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('server is running on port 5000');
    });
  })
  .catch(err => console.log(err));