const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Debug logs
console.log('Views directory:', path.join(__dirname, 'views'));
console.log('Current directory:', __dirname);

// Database connection
main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// New listing form route
app.get('/listings/new', (req, res) => {
    console.log('Accessing new listing form');
    res.render('new');
});

// All listings route
app.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render('listings', { listings });
    } catch(err) {
        console.error('Error fetching listings:', err);
        res.status(500).send('Error fetching listings');
    }
});

// Single listing route
app.get("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show", { listing });
    } catch(err) {
        console.error('Error fetching listing:', err);
        res.status(500).send("Error fetching listing");
    }
});

// Edit listing route
app.get('/listings/:id/edit', async (req, res) => {

    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render('edit', { listing });
    } catch(err) {
        console.error('Error fetching listing for edit:', err);
        res.status(500).send("Error fetching listing for edit");
    }
});

// Update listing route
app.put('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedListing = await Listing.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            imageUrl: req.body.image
        }, { new: true });
        res.redirect(`/listings/${id}`);
    } catch(err) {
        console.error('Error updating listing:', err);
        res.status(500).send("Error updating listing");
    }
});

// Handle new listing submission
app.post('/listings', async (req, res) => {
    try {
        const newListing = new Listing({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            imageUrl: req.body.image
        });
        await newListing.save();
        res.redirect('/listings');
    } catch(err) {
        console.error('Error creating listing:', err);
        res.status(500).send("Error creating listing");
    }
});

app.get('/listings/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
     res.send('Edit listing page'); 
    } catch(err) {
        console.error('Error fetching listing for edit:', err);
        res.status(500).send("Error fetching listing for edit");
    }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}/listings/new to create a new listing`);
});
