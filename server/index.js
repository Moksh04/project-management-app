const express = require('express');
const cors = require('cors');
const corsConfig = {
  origin: '*',
  credetial: true,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
};
require('dotenv').config({ path: './config.env' });
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // we don't need to import this
const colors = require('colors');
const connectDB = require('./config/db');

app.options('', cors(corsConfig)); // cors config for allowing access from cross origins
app.use(cors(corsConfig)); // important for working with react frontend server

const port = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema, // same as schema: schema bcs key and value have same name
    graphiql: process.env.NODE_ENV === 'development' ? true : false, // gives us a user interface for testing our apis, no need for api testers such as postman
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
