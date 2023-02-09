const customHeader = (req, res, next) => {
    try {
        const apikey = req.headers.api_key;
        if (apikey === "mateo-01") {
            next()
        } else {
            res.status(403);
            res.send({ error: "API_KEY_NO_ES_CORRECTA" });
        }
    } catch (e) {
        res.status(404);
        res.send({ error: "ALGO_OCURRIÓ_EN_EL_CUSTOM_HEADER" })
    }
}

module.exports = {
    customHeader
}