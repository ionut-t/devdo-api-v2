/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

mongoose
    .connect(process.env.API_KEY, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to database'));

// Delete all data from database
const emptyDB = async () => {
    try {
        await Task.deleteMany();
        await User.deleteMany();
        console.log('Database successfully cleared');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};
emptyDB();
