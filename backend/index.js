require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const engine = require('./services/engine');
const GlobalState = require('./models/GlobalState');

const app = express();
app.use(cors());
app.use(express.json());

// Performance Cache (Only works if Vercel keeps the function warm)
let localState = null;

// Connect Mongoose ONLY if not already connected (Crucial for Vercel Serverless)
async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
    });
}

async function getOrInitState() {
    await connectDB();
    let state = await GlobalState.findOne().lean(); // Use lean() for 30% faster reads
    if (!state) {
        state = await GlobalState.create({ totalClicks: 0, totalUsers: 0 });
    }
    return state;
}

app.get('/api/state', async (req, res) => {
    try {
        const state = await getOrInitState();
        if (req.query.newUser === 'true') {
            await GlobalState.updateOne({}, { $inc: { totalUsers: 1 } });
            state.totalUsers += 1;
        }

        const mood = engine.calculateMood(state.totalClicks);
        res.json({
            success: true,
            data: { 
                totalClicks: state.totalClicks, 
                totalUsers: state.totalUsers, 
                activeEvent: state.activeEvent, 
                mood, 
                themeConfig: engine.getThemeConfig(mood) 
            }
        });
    } catch (err) {
        console.error("STATE ERROR:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/click', async (req, res) => {
    try {
        await connectDB();
        // Atomic Update + Atomic Fetch (Faster than separate operations)
        const updated = await GlobalState.findOneAndUpdate(
            {}, 
            { $inc: { totalClicks: 1 } }, 
            { new: true, upsert: true, lean: true }
        );

        const mood = engine.calculateMood(updated.totalClicks);
        res.json({
            success: true,
            data: { 
                totalClicks: updated.totalClicks, 
                totalUsers: updated.totalUsers, 
                activeEvent: updated.activeEvent, 
                mood, 
                eventMessage: engine.generateEvent(mood),
                themeConfig: engine.getThemeConfig(mood) 
            }
        });
    } catch (err) {
        console.error("CLICK ERROR:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- ADMIN ---
const verifyAdmin = (req, res, next) => {
    const pin = req.body.pin || req.headers['x-admin-pin'];
    if (pin === (process.env.ADMIN_PIN || '69420')) return next();
    res.status(401).json({ success: false, error: 'Unauthorized' });
};

app.post('/api/admin/verify', verifyAdmin, (req, res) => res.json({ success: true }));

app.post('/api/admin/reset', verifyAdmin, async (req, res) => {
    await GlobalState.updateOne({}, { totalClicks: 0, totalUsers: 0, activeEvent: null });
    res.json({ success: true, message: 'Reset done.' });
});

app.post('/api/admin/trigger', verifyAdmin, async (req, res) => {
    const { event } = req.body;
    let update = { activeEvent: event };
    if (event === 'chaos') update.totalClicks = 300;
    
    await GlobalState.updateOne({}, update);
    res.json({ success: true, event });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Up on ${PORT}`));
