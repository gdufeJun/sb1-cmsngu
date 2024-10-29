import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { hash } from 'bcryptjs';

let db;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
  }
  return db;
}

export async function initializeDatabase() {
  const db = await getDb();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create test user if it doesn't exist
  const testUser = await db.get('SELECT * FROM users WHERE email = ?', ['test@example.com']);
  if (!testUser) {
    const hashedPassword = await hash('password', 10);
    await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      ['Test User', 'test@example.com', hashedPassword]
    );
  }
}