require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const engine = require('./services/engine');
const GlobalState = require('./models/GlobalState');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        initializeState();
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

let state = { totalClicks: 0, totalUsers: 0, activeEvent: null };

async function initializeState() {
    try {
        let globalState = await GlobalState.findOne();
        if (!globalState) {
            globalState = await GlobalState.create({ totalClicks: 0, totalUsers: 0 });
        }
        state.totalClicks = globalState.totalClicks;
        state.totalUsers = globalState.totalUsers;
        console.log('Global state initialized from DB');
    } catch (err) {
        console.error('Error initializing state:', err);
    }
}

const triggerRandomEvent = () => {
    const events = ['glitch', 'invert', 'fake_warning', 'extreme_shift'];
    state.activeEvent = events[Math.floor(Math.random() * events.length)];
    
    setTimeout(() => {
        state.activeEvent = null;
    }, 15000);
    
    const nextTriggerInMs = Math.floor(Math.random() * (180000 + 1)) + 120000;
    setTimeout(triggerRandomEvent, nextTriggerInMs);
};

setTimeout(triggerRandomEvent, 120000);

app.get('/api/state', async (req, res) => {
    if (req.query.newUser === 'true') {
        state.totalUsers += 1;
        await GlobalState.findOneAndUpdate({}, { $inc: { totalUsers: 1 } });
    }
    
    const mood = engine.calculateMood(state.totalClicks);
    const themeConfig = engine.getThemeConfig(mood);
    
    res.json({
        success: true,
        data: { ...state, mood, themeConfig }
    });
});

app.post('/api/click', async (req, res) => {
    state.totalClicks += 1;
    await GlobalState.findOneAndUpdate({}, { $inc: { totalClicks: 1 } });
    
    const mood = engine.calculateMood(state.totalClicks);
    const eventMessage = engine.generateEvent(mood);
    const themeConfig = engine.getThemeConfig(mood);
    
    res.json({
        success: true,
        data: { ...state, mood, eventMessage, themeConfig }
    });
});

// --- ADMIN SECURE OVERRIDE ROUTES ---

const verifyAdmin = (req, res, next) => {
    const pin = req.body.pin || req.headers['x-admin-pin'];
    if (pin === (process.env.ADMIN_PIN || '69420')) {
        next();
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized Access' });
    }
};

app.post('/api/admin/verify', verifyAdmin, (req, res) => {
    res.json({ success: true, message: 'Admin verified successfully' });
});

app.post('/api/admin/reset', verifyAdmin, async (req, res) => {
    state.totalClicks = 0;
    state.totalUsers = 0;
    state.activeEvent = null;
    await GlobalState.findOneAndUpdate({}, { totalClicks: 0, totalUsers: 0, activeEvent: null });
    res.json({ success: true, message: 'System completely reset.', data: state });
});

app.post('/api/admin/trigger', verifyAdmin, (req, res) => {
    const { event } = req.body;
    if (event === 'chaos') {
        state.totalClicks = 300; 
        state.activeEvent = 'extreme_shift';
    } else {
        state.activeEvent = event;
        // Don't persist rare events to DB as they are transient
        setTimeout(() => { state.activeEvent = null; }, 15000);
    }
    res.json({ success: true, message: `Forced Event: ${event}`, data: state });
});

app.post('/api/admin/set-state', verifyAdmin, async (req, res) => {
    const { clicks, users, event } = req.body;
    const update = {};
    if (typeof clicks === 'number') {
        state.totalClicks = clicks;
        update.totalClicks = clicks;
    }
    if (typeof users === 'number') {
        state.totalUsers = users;
        update.totalUsers = users;
    }
    if (event !== undefined) state.activeEvent = event;
    
    if (Object.keys(update).length > 0) {
        await GlobalState.findOneAndUpdate({}, update);
    }
    res.json({ success: true, message: 'State forcibly overridden.', data: state });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
