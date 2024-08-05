import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
    await import('./startAndSeedMemoryDB');
}
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}
const DATABASE_URL = process.env.DATABASE_URL;

const mongoClient = new MongoClient(DATABASE_URL);
console.log('Connecting to MongoDB...');
export const mongoConnection = await mongoClient.connect();
console.log('Successfully connected to MongoDB!')

