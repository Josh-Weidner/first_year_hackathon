import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING as string;

if (!connectionString) {
    throw new Error("DB_CONNECTION_STRING not found in environment");
}

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
    if (pool) return pool;

    try {
        pool = await sql.connect(connectionString);
        console.log("✅ Connected to SQL Server");
        return pool;
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        throw err;
    }
}
