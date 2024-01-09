const sqlite3 = require('sqlite3').verbose();

// Open a database in memory
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

// Create a new table
db.serialize(() => {
  db.run('CREATE TABLE data(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Created the data table.');
    }
  });
});

module.exports = db;
