const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Data ထည့်တဲ့ အချိန်ကို အလိုအလျောက် မှတ်သားပေးမည်
});

module.exports = mongoose.model('Metric', metricSchema);