import { db } from "./db";
import { folders } from "./db/schema";

export async function keepAlive() {
    try {
        // Simple query to keep the database active
        await db.select().from(folders).limit(1);
        console.log("Keep-alive query executed successfully");
    } catch (error) {
        console.error("Keep-alive query failed:", error);
    }
} 