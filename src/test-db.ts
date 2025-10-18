import { getConnection } from "./db.ts";

async function main() {
    const pool = await getConnection();

    const result = await pool.request().query("SELECT TOP 5 * FROM sys.tables");
    console.log("Tables:", result.recordset);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
