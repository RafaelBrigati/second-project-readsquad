
const uri = process.env.MONGODB_URI

const mongoose = require('mongoose');
 
mongoose
  .connect(uri)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
