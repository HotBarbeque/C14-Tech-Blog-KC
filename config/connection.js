// Importing the Sequelize library
const Sequelize = require('sequelize');
// Loading environment variables from a .env file
require('dotenv').config();

let sequelize;
// Checking if a JAWSDB_URL environment variable is present
if (process.env.JAWSDB_URL) {
     // Creating a Sequelize instance with the JAWSDB_URL
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
     // Creating a Sequelize instance with the local database configuration
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        }
    );
}
// Exporting the created Sequelize instance for use in other modules
module.exports = sequelize;