const mongoose = require('mongoose');
const data = require('./data.js');
const listing= require('../models/listing.js');


const mongodbURI = 'mongodb://127.0.1:27017/wanderlust';
main ().then
(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect(mongodbURI);
}
const intitdata= async () => {
    try {
        await listing.deleteMany({});
        const createdData = await listing.insertMany(data);
        console.log('Data initialized:', createdData);
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}
