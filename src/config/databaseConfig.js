const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database sucessfully");
    } catch (error) {
        console.error('Could not connect to database: ', error.message);
    }
};