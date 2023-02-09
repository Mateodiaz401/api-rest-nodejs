const handleHttpError = (res, message = "ALgo sucedió", code = 403) => {
    res.status(code);
    res.send({ error: message });
}

module.exports = {
    handleHttpError
}