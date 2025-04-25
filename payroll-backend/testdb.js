
const pool = require('./config/db');

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
})();