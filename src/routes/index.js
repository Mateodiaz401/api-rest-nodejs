const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    //TODO Tracks.js [tracks, js]
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file); //TODO track, storage, users
    if (name !== 'index') {
        router.use(`/${name}`, require(`./${file}`)); //TODO  http://localhost:3000/api/tracks
    }

});


module.exports = router;