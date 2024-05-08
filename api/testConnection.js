import connection from "./configuration/database.js";

// Para probar se entra a la terminal, ubicado en /api y ejecutal 'node testConnection.js'

async function testDatabaseConnection() {
    try {
        // Realiza una consulta simple para obtener todos los usuarios
        const [rows] = await connection.query('SELECT * FROM user');
        console.log('Conexión exitosa. Datos recibidos:', rows);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testDatabaseConnection();