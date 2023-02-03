const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3003;

app.listen(PORT, () => {
    console.log('Tu aplicación es lista en el puerto:' + PORT);
})