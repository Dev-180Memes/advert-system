// utils/mongodb.ts

import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const uri = process.env.MONGODB_URI || 'your-default-mongodb-uri'; // Set your MongoDB URI here
const dbName = process.env.DB_NAME || 'your-default-db-name'; // Set your DB name here

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!dbName) {
  throw new Error('Please define the DB_NAME environment variable inside .env.local');
}

/**
 * Connect to MongoDB and return the database instance.
 * Uses a singleton pattern to ensure a single connection throughout the app's lifecycle.
 * 
 * @returns {Promise<Db>} The MongoDB database instance
 */
export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!client) {
    client = new MongoClient(uri);
  }

  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  db = client.db(dbName);
  return db;
}
