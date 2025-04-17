const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ListingSchema = require('./models/listing');


 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/listings', async (req, res) => {
    let listings = new ListingSchema({
        title: "Beach House",
        description: "A beautiful beach house with stunning ocean views.",
        price: 250000,
        location: "California",
    });
    await listings.save();
    console.log(listings);
}
);

