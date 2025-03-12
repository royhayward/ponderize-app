const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure the directory exists
const dbDirectory = path.join(__dirname);
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Set proper permissions for the database file
const dbPath = path.join(dbDirectory, 'scripture.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    // Log more details about the error
    console.error('Database path:', dbPath);
    console.error('Current working directory:', process.cwd());
    console.error('Directory permissions:', fs.statSync(dbDirectory));
  } else {
    // Set file permissions to 666 (rw-rw-rw-)
    fs.chmodSync(dbPath, 0o666);
    console.log('Connected to SQLite database at:', dbPath);
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