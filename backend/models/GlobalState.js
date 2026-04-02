const mongoose = require('mongoose');

const GlobalStateSchema = new mongoose.Schema({
    totalClicks: { type: Number, default: 0 },
    totalUsers: { type: Number, default: 0 },
    mood: { type: String, default: 'calm' },
    activeEvent: { type: String, default: null },
    lastEventTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GlobalState', GlobalStateSchema);
