const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const PORT = process.env.PORT || 4000;
const schema = require('./schema');

// mongodb connection
let db = mongoose.connect(
  'mongodb://127.0.0.1:27017/graphql',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});

let connection = mongoose.connection;
connection.on('connected', ()=>{
  console.log('db is connected');
});

connection.on('error', (e)=>{
  console.log(e);
});
/*******************************/


const app = express();
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))


app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
});
