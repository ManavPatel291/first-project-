const mongoose = require('mongoose');
const data = require('./data.js');
const listing = require('../models/listing.js');

const mongodbURI = 'mongodb://127.0.0.1:27017/wanderlust';

main()
    .then(() => {
        console.log('Connected to MongoDB');
        return initData();
    })
    .then(() => {
        console.log('Data initialization completed successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        mongoose.connection.close();
    });

async function main() {
    await mongoose.connect(mongodbURI);
}

async function initData() {
    try {
        await listing.deleteMany({});
        const createdData = await listing.insertMany(data);
        console.log('Data initialized successfully');
        return createdData;
    } catch (error) {
        console.error('Error initializing data:', error);
        throw error;
    }
}

