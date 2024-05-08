import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config()

// Configuración de la conexión
const connection = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
