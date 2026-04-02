exports.calculateMood = (clicks) => {
  if (clicks < 50) return 'calm';
  if (clicks <= 200) return 'weird';
  return 'chaos';
};

exports.generateEvent = (mood) => {
  const events = {
    calm: [
      "Everything is peaceful... for now",
      "The breeze is nice.",
      "Take a deep breath.",
      "A quiet space to exist."
    ],
    weird: [
      "The system is watching you 👀",
      "Wait, did something just move?",
      "Reality is bending...",
      "Who is pulling the strings?"
    ],
    chaos: [
      "ERROR 404: Sanity not found.",
      "You clicked too much. Calm down.",
      "G L I T C H",
      "TOO MUCH POWER!!!",
      "THE FABRIC OF THE WEB IS TEARING!"
    ]
  };
  const list = events[mood];
  return list[Math.floor(Math.random() * list.length)];
};

exports.getThemeConfig = (mood) => {
  return {
    theme: mood,
    // Add additional config properties here if needed later
  };
};
