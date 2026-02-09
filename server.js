require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected');

    // routes
    const Routes = require('./route/route');
    app.use('/api', Routes);

    // server start
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  })
  .catch(err => {
    console.log(' MongoDB connection error:', err);
  });
