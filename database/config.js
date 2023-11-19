const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB: connected");
    } catch (error) {
        console.log(error);
        throw new Error("DB: error in the connection");
    }
}

module.exports = {
    dbConnection
}