/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * SQLite database connection and helper functions
 * Uses sql.js (WebAssembly-based) to avoid native compilation issues across
 * different Node.js versions and platforms.
 */

import initSqlJs, { type Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { DB_CONFIG, TEST_DB_CONFIG } from './config';

/*
 * Database connection and query execution
 * Wraps sql.js Database to maintain API compatibility with the rest of the app
 */
class DatabaseConnection {
  public db: SqlJsDatabase;
  private dbPath: string;

  constructor(db: SqlJsDatabase, dbPath: string) {
    this.db = db;
    this.dbPath = dbPath;
  }

  private persist(): void {
    if (this.dbPath !== ':memory:') {
      const data = this.db.export();
      fs.writeFileSync(this.dbPath, Buffer.from(data));
    }
  }

  /**
   * Execute a SQL statement that modifies data (INSERT, UPDATE, DELETE)
   * @param sql SQL statement to execute
   * @param params Parameters to bind to the SQL statement
   * @returns Object containing lastID (for INSERT) and number of changes
   */
  public run(sql: string, params: unknown[] = []): Promise<{ lastID?: number; changes: number }> {
    this.db.run(sql, params as any[]);
    const lastIDResult = this.db.exec("SELECT last_insert_rowid()");
    const changesResult = this.db.exec("SELECT changes()");
    const lastID = lastIDResult[0]?.values[0]?.[0] as number | undefined;
    const changes = (changesResult[0]?.values[0]?.[0] as number) || 0;
    this.persist();
    return Promise.resolve({ lastID, changes });
  }

  public get<T = unknown>(sql: string, params: unknown[] = []): Promise<T | undefined> {
    const stmt = this.db.prepare(sql);
    stmt.bind(params as any[]);
    if (stmt.step()) {
      const cols = stmt.getColumnNames();
      const values = stmt.get();
      stmt.free();
      const row: any = {};
      cols.forEach((col: string, i: number) => { row[col] = values[i]; });
      return Promise.resolve(row as T);
    }
    stmt.free();
    return Promise.resolve(undefined);
  }

  public all<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const results: T[] = [];
    const stmt = this.db.prepare(sql);
    stmt.bind(params as any[]);
    while (stmt.step()) {
      const cols = stmt.getColumnNames();
      const values = stmt.get();
      const row: any = {};
      cols.forEach((col: string, i: number) => { row[col] = values[i]; });
      results.push(row as T);
    }
    stmt.free();
    return Promise.resolve(results);
  }

  public close(): Promise<void> {
    this.persist();
    this.db.close();
    return Promise.resolve();
  }
}

class SQLiteHelper {
  private static instance: SQLiteHelper;
  private connection: SqlJsDatabase | null = null;

  private constructor() {}

  public static getInstance(): SQLiteHelper {
    if (!SQLiteHelper.instance) {
      SQLiteHelper.instance = new SQLiteHelper();
    }
    return SQLiteHelper.instance;
  }

  /**
   * Initialize database connection
   */
  public async connect(isTest: boolean = false): Promise<DatabaseConnection> {
    const config = isTest ? TEST_DB_CONFIG : DB_CONFIG;

    // Ensure data directory exists for file-based databases
    if (config.DB_FILE !== ':memory:') {
      const dataDir = path.dirname(config.DB_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
    }

    try {
      const SQL = await initSqlJs();

      // Load existing database file or create a new one
      if (config.DB_FILE !== ':memory:' && fs.existsSync(config.DB_FILE)) {
        const buffer = fs.readFileSync(config.DB_FILE);
        this.connection = new SQL.Database(buffer);
      } else {
        this.connection = new SQL.Database();
      }

      // Configure database settings
      this.setupDatabase(config);

      return new DatabaseConnection(this.connection, config.DB_FILE);
    } catch (err) {
      throw new Error(`Failed to connect to database: ${(err as Error).message}`);
    }
  }

  /**
   * Configure database settings
   */
  private setupDatabase(config: typeof DB_CONFIG): void {
    if (!this.connection) return;

    // Enable foreign key constraints
    if (config.FOREIGN_KEYS) {
      try {
        this.connection.run('PRAGMA foreign_keys = ON');
      } catch (err) {
        throw new Error(`Failed to enable foreign key constraints: ${(err as Error).message}`);
      }
    }

    // Enable WAL mode for better concurrency (only for file databases)
    if (config.ENABLE_WAL && config.DB_FILE !== ':memory:') {
      try {
        this.connection.run('PRAGMA journal_mode = WAL');
      } catch (err) {
        throw new Error(`Failed to enable WAL mode: ${(err as Error).message}`);
      }
    }
  }

  /**
   * Close database connection
   */
  public async close(): Promise<void> {
    if (this.connection) {
      try {
        this.connection.close();
        this.connection = null;
      } catch (err) {
        throw new Error(`Failed to close database: ${(err as Error).message}`);
      }
    }
  }
}

// Global database connection instance
let dbConnection: DatabaseConnection | null = null;

/**
 * Get the global database connection
 */
export async function getDatabase(isTest: boolean = false): Promise<DatabaseConnection> {
  if (!dbConnection) {
    const helper = SQLiteHelper.getInstance();
    dbConnection = await helper.connect(isTest);
  }
  return dbConnection;
}

/**
 * Close the global database connection
 */
export async function closeDatabase(): Promise<void> {
  if (dbConnection) {
    await dbConnection.close();
    dbConnection = null;
  }
}

export { SQLiteHelper, DatabaseConnection };
