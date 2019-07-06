/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.set('useCreateIndex', true);

// Connect to DB
mongoose
    .connect(process.env.API_KEY, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(express.json());

// Set CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

module.exports = app;
