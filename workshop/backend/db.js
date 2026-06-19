import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'workshop.db');

const SQL = await initSqlJs();

// Load existing database file or create a new one
const dbBuffer = existsSync(DB_PATH) ? readFileSync(DB_PATH) : null;
const sqlDb = dbBuffer ? new SQL.Database(dbBuffer) : new SQL.Database();

sqlDb.run(`
  CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    team TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id INTEGER NOT NULL,
    module_id TEXT NOT NULL,
    exercise_index INTEGER NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participants(id),
    UNIQUE(participant_id, module_id, exercise_index)
  );
`);

// Save database to disk periodically and on changes
function persist() {
  const data = sqlDb.export();
  writeFileSync(DB_PATH, Buffer.from(data));
}

// Wrapper that exposes an API compatible with better-sqlite3's usage in server.js
const db = {
  prepare(sql) {
    return {
      get(...params) {
        const stmt = sqlDb.prepare(sql);
        stmt.bind(params);
        if (stmt.step()) {
          const cols = stmt.getColumnNames();
          const values = stmt.get();
          stmt.free();
          const row = {};
          cols.forEach((col, i) => { row[col] = values[i]; });
          return row;
        }
        stmt.free();
        return undefined;
      },
      all(...params) {
        const results = [];
        const stmt = sqlDb.prepare(sql);
        stmt.bind(params);
        while (stmt.step()) {
          const cols = stmt.getColumnNames();
          const values = stmt.get();
          const row = {};
          cols.forEach((col, i) => { row[col] = values[i]; });
          results.push(row);
        }
        stmt.free();
        return results;
      },
      run(...params) {
        sqlDb.run(sql, params);
        persist();
        return {
          lastInsertRowid: sqlDb.exec("SELECT last_insert_rowid()")[0]?.values[0][0],
          changes: sqlDb.getRowsModified()
        };
      }
    };
  }
};

persist();

export default db;
