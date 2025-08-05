import { MongoClient, ServerApiVersion } from "mongodb";

let client = null;
let db = null;

export async function connectToDatabase() {
    if (!db) {
        const uri = process.env.ATLAS_URI || "";
        
        if (!uri) {
            throw new Error("ATLAS_URI environment variable is not set");
        }
        
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        
        try {
            // Connect the client to the server
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ping: 1});
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            db = client.db("events");
        } catch(err) {
            console.error("Database connection error:", err);
            throw err;
        }
    }
    return db;
}

export default db;