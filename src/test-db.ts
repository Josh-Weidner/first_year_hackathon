import { getConnection } from "./db.ts";

async function main() {
    const pool = await getConnection();

    const createTableQuery = `
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Students')
    BEGIN
      CREATE TABLE Students (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        Major NVARCHAR(100) NOT NULL
      )
    END
  `;

    try {
        await pool.request().query(createTableQuery);
        console.log("✅ Students table created (or already exists)");
    } catch (err) {
        console.error("❌ Error creating Students table:", err);
    } finally {
        pool.close();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
