const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        port,
        dialect: "mysql",
    },
)
const dbConnectionMysql = async (db) => {
    try {
        await sequelize.authenticate();
        console.log("MYSQL connected");
    } catch (error) {
        console.log("MYSQL Error de conexión", error);
    }
};

module.exports = {
    sequelize,
    dbConnectionMysql
}