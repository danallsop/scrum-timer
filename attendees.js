/**
 * Scrum Timer - Attendees Configuration
 *
 * Edit this file to configure who appears in the scrum timer.
 * Set "absent" to true to temporarily exclude someone without removing them.
 * The "timeLimit" is the per-person time limit in seconds (default: 60).
 */
const SCRUM_CONFIG = {
    timeLimit: 60,
    attendees: [
        { name: 'Dan' },
        { name: 'Rohit' },
        { name: 'Harpreet', absent: true },
        { name: 'Tracey' }
    ]
};
