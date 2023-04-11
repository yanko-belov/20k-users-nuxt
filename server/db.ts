import { MongoClient } from "mongodb";

const client = new MongoClient(import.meta.env.NUXT_MONGODB_URI as string);
const database = client.db(import.meta.env.NUXT_MONGODB_DB as string);

export { database };
