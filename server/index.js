const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // we don't need to import this
const colors = require('colors');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

app.use(cors()); // important for working with react frontend server

app.use(
  '/graphql',
  graphqlHTTP({
    schema, // same as schema: schema bcs key and value have same name
    graphiql: process.env.NODE_ENV === 'development' ? true : false,
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
