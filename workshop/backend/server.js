import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Register a participant
app.post('/api/participants', (req, res) => {
  const { name, team } = req.body;
  if (!name || !team) return res.status(400).json({ error: 'Name and team are required' });

  const existing = db.prepare('SELECT * FROM participants WHERE name = ? AND team = ?').get(name, team);
  if (existing) return res.json(existing);

  const result = db.prepare('INSERT INTO participants (name, team) VALUES (?, ?)').run(name, team);
  const participant = db.prepare('SELECT * FROM participants WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(participant);
});

// Get all participants
app.get('/api/participants', (_req, res) => {
  const participants = db.prepare(`
    SELECT p.*, COUNT(pr.id) as completedExercises
    FROM participants p
    LEFT JOIN progress pr ON p.id = pr.participant_id
    GROUP BY p.id
    ORDER BY p.score DESC
  `).all();
  res.json(participants);
});

// Mark exercise complete
app.post('/api/progress', (req, res) => {
  const { participantId, moduleId, exerciseIndex } = req.body;
  if (!participantId || !moduleId || exerciseIndex === undefined) {
    return res.status(400).json({ error: 'participantId, moduleId, and exerciseIndex are required' });
  }

  try {
    db.prepare(
      'INSERT OR IGNORE INTO progress (participant_id, module_id, exercise_index) VALUES (?, ?, ?)'
    ).run(participantId, moduleId, exerciseIndex);

    // Award 10 points per exercise
    db.prepare('UPDATE participants SET score = score + 10 WHERE id = ?').run(participantId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record progress' });
  }
});

// Leaderboard
app.get('/api/leaderboard', (_req, res) => {
  const leaderboard = db.prepare(`
    SELECT p.name, p.team, p.score, COUNT(pr.id) as completedExercises
    FROM participants p
    LEFT JOIN progress pr ON p.id = pr.participant_id
    GROUP BY p.id
    ORDER BY p.score DESC
    LIMIT 20
  `).all();
  res.json(leaderboard);
});

// Add score
app.post('/api/score', (req, res) => {
  const { participantId, points } = req.body;
  if (!participantId || !points) return res.status(400).json({ error: 'participantId and points are required' });

  db.prepare('UPDATE participants SET score = score + ? WHERE id = ?').run(points, participantId);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Workshop API running on http://localhost:${PORT}`);
});
