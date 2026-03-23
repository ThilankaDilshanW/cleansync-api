const express = require('express');
const app = express();
const PORT = process.env.PORT || 7860;

// A simple API route returning data for the CleanSync app
app.get('/api/services', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: "Standard Home Cleaning", price: 50 },
            { id: 2, name: "Deep Carpet Cleaning", price: 120 },
            { id: 3, name: "Move-in/Move-out Scrub", price: 200 }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`CleanSync API is running on http://localhost:${PORT}`);
});