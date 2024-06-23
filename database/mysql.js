import { createPool } from "mysql2/promise";

const mysqlConfig = {
  user: "user",
  password: "password",
  database: "db",
  host: "mysql", // Use container name if using Docker Compose
};

export async function connectToMysql() {
  try {
    const pool = await createPool(mysqlConfig);
    return pool;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error; // Re-throw for handling in main script
  }
}
