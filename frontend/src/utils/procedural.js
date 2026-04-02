// Uncoupled semantic arrays representing structural dialogue options
const SUBJECTS = ["The network", "A shadow parameter", "The core entity", "Your presence", "An unknown node", "Reality framing", "The void"];
const VERBS = ["is watching", "is destabilizing", "has recognized", "is shifting through", "rejects", "corrupts", "passively observes"];
const ENDINGS = ["quietly.", "with aggressive intent.", "beyond physical repair.", "in the background memory.", "exactly as requested.", "...and waits endlessly."];

export const generateProceduralMessage = () => {
    const s = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const v = VERBS[Math.floor(Math.random() * VERBS.length)];
    const e = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
    return `${s} ${v} ${e}`;
};

export const generateChaosColor = (intensity = 0.5, isFg = false) => {
    // Generates completely sober minimal styling at 0 intensity ensuring clean resets natively
    if (intensity < 0.05) {
        return isFg ? '#e2e8f0' : '#020617'; // slate-200 on slate-950
    }
    
    // Scale intensity
    if (intensity < 0.3) {
        // Deep soft palettes (dark blue/purple)
        return isFg ? `hsl(${Math.floor(Math.random() * 60 + 200)}, 40%, 70%)` 
                    : `hsl(${Math.floor(Math.random() * 60 + 200)}, 30%, 12%)`; 
    } else if (intensity < 0.7) {
        // Unpredictable dynamic shifts
        return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 60 + 40)}%, ${isFg ? Math.floor(Math.random() * 40 + 50) : Math.floor(Math.random() * 20 + 10)}%)`; 
    } else {
        // Total chaotic neon rendering limits
        const hues = [0, 60, 120, 240, 300]; // Red, Yellow, Green, Blue, Magenta neons
        const neon = hues[Math.floor(Math.random() * hues.length)];
        return `hsl(${neon}, 100%, ${isFg ? '60%' : '15%'})`; 
    }
};

export const getProceduralEffect = (intensity) => {
    const active = [];
    if (Math.random() < (intensity * 0.5)) active.push('fx-glitch');
    if (Math.random() < (intensity * 0.9)) active.push('fx-rotate');
    if (Math.random() < (intensity * 0.7)) active.push('fx-distort');
    if (Math.random() < (intensity * 0.3)) active.push('fx-invert');
    if (intensity > 0.85 && Math.random() < 0.6) active.push('fx-distort-cursor');
    return active.join(' ');
};
