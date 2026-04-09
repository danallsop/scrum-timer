# Scrum Timer

A simple in-browser scrum timer that cycles through team members in a random order, timing each person's update.

## Usage

Open `index.html` directly in a browser — no server required.

1. Click **Next** to start the first speaker's timer.
2. Click **Next** again to move to the next speaker. The timer resets for each person.
3. When all speakers are done, the button shows **Done**.

The timer turns red when a speaker exceeds their time limit.

## Configuring Attendees

Edit `attendees.js` to manage the team roster:

```js
const SCRUM_CONFIG = {
    timeLimit: 60,       // seconds per person
    attendees: [
        { name: 'Dan' },
        { name: 'Rohit' },
        { name: 'Harpreet', absent: true }, // excluded today
        { name: 'Tracey' }
    ]
};
```

- **Add** a person by adding a new `{ name: '...' }` entry.
- **Remove** a person by deleting their entry.
- **Mark absent** by adding `absent: true` — they will be skipped without being removed from the list.
- **Change the time limit** by updating `timeLimit` (in seconds).

## File Structure

| File            | Purpose                                      |
|-----------------|----------------------------------------------|
| `index.html`    | Page structure                               |
| `styles.css`    | Styling and responsive layout                |
| `timer.js`      | Timer logic (shuffle, elapsed timer, display) |
| `attendees.js`  | Configuration — edit this to change attendees |
