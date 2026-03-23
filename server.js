const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7860;

// Middleware to allow our API to read JSON data sent from your Flutter app
app.use(cors());
app.use(express.json());

// 1. Securely connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Define the Blueprint (Schema) for a Cleaning Service
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const Service = mongoose.model('Service', serviceSchema);

// 3. GET Route: Fetch all live services from the database
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json({ success: true, data: services });
    } catch (error) {
        console.error("Database Error:", error); // Logs to Hugging Face terminal
        // Expose the exact error message to the web browser
        res.status(500).json({ success: false, message: "Server Error", details: error.message });
    }
});

// 4. POST Route: Allow an admin app to add a new service
app.post('/api/services', async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json({ success: true, data: newService });
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Data" });
    }
});

// 5. Fix the "Cannot GET /" error with a friendly homepage
app.get('/', (req, res) => {
    res.send('CleanSync Enterprise API is Online and connected to MongoDB!');
});

app.listen(PORT, () => {
    console.log(`CleanSync API is running on port ${PORT}`);
});