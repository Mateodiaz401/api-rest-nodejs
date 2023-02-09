require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const morganBody = require('morgan-body');
const openApiConfigration = require('./docs/swagger');
const loggerStream = require('./utils/handleLogger');
const dbConnectNosql = require('./config/mongo');
const { dbConnectionMysql } = require('./config/mysql');
const app = express();


const engine = process.env.ENGINE_DB;


app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400 //TODO 2xx, 3xx
    }
});

const PORT = process.env.PORT || 3000;

/**
 * Definir la ruta de documentación
 */
app.use('/documentation',
    swaggerUI.serve,
    swaggerUI.setup(openApiConfigration))
app.get('/documentation/docs.json', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.send(openApiConfigration)
})

/**
 * ? Aquí invocamos  a las rutas
 */

//TODO localhost/api/_______

app.use("/api", require("./routes"))

app.listen(PORT, () => {
    console.log(`Tu aplicación es lista en el puerto:${PORT}`);
});

(engine === 'nosql') ? dbConnectNosql() : dbConnectionMysql()


