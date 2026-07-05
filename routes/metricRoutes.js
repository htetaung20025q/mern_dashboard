const express = require('express');
const router = express.Router();
const Metric = require('../models/Metric');

// ၁။ Database ထဲက Data အားလုံးကို ဆွဲထုတ်မည့် API (GET Request)
router.get('/', async (req, res) => {
    try {
        const metrics = await Metric.find(); // Data များကို ရှာဖွေခြင်း
        res.json(metrics); // Frontend သို့ JSON ပုံစံဖြင့် ပြန်ပို့ခြင်း
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ၂။ Database ထဲသို့ Data အသစ်ထည့်မည့် API (POST Request)
router.post('/', async (req, res) => {
    const metric = new Metric({
        title: req.body.title,
        value: req.body.value
    });

    try {
        const newMetric = await metric.save();
        res.status(201).json(newMetric);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;