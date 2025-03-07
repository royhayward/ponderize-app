const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open database with write permissions (OPEN_READWRITE | OPEN_CREATE)
const db = new sqlite3.Database(path.join(__dirname, 'scripture.db'), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS scriptures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      year INTEGER NOT NULL,
      reference TEXT NOT NULL,
      text TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      historicalContext TEXT NOT NULL,
      gospelTeaching TEXT NOT NULL,
      personalTestimony TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(week, year)
    )
  `);
});

module.exports = db;