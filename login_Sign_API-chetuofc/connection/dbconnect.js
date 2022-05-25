require('dotenv').config();

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.log('database connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });
