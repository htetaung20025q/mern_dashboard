const API_URL = "http://localhost:5000/api/metrics";
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Route ဖိုင်ကို ခေါ်ယူခြင်း
const metricRoutes = require('./routes/metricRoutes'); 

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API လမ်းကြောင်း သတ်မှတ်ခြင်း (http://localhost:5000/api/metrics ဖြင့် ခေါ်ယူနိုင်မည်)
app.use('/api/metrics', metricRoutes);

app.get('/', (req, res) => {
    res.send('Dashboard Backend is perfectly running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
module.exports = app;