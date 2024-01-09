import express from "express";
import cors from "cors";
import sqlite3 from 'sqlite3';
import crypto from 'crypto';

interface DataRow {
  dataHash: string;
}

const PORT = 8080;
const app = express();
const db = new sqlite3.Database(':memory:'); // Assuming in-memory database

app.use(cors());
app.use(express.json());

function calculateHash(data: string): string {
    return crypto
        .createHash('sha256')
        .update(data)
        .digest('hex');
}

// Set up the database
db.serialize(() => {
  db.run('CREATE TABLE if not exists data (id INTEGER PRIMARY KEY, content TEXT, dataHash TEXT)');
});

// Routes

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post('/update', (req, res) => {
  const { data } = req.body;
  const dataHash = calculateHash(data);
  const query = `INSERT INTO data (content, dataHash) VALUES (?, ?)`;

  db.run(query, [data, dataHash], (err) => {
    if (err) {
      res.status(500).send("Error updating data in the database");
      console.error(err.message);
    } else {
      res.status(200).send("Data updated successfully");
    }
  });
});

app.post('/verify', (req, res) => {
  const { data } = req.body;
  const currentHash = calculateHash(data);

  const someId = 1; // replace with the actual id

  db.get("SELECT dataHash FROM data WHERE id = ?", [someId], (err: Error | null, row: DataRow) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Internal Server Error");
    }

    const isValid = row?.dataHash === currentHash;
    res.json({ isValid });
  });
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
