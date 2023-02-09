const { check } = require("express-validator");

const validateResult = require("../utils/handlevalidator")


const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];



module.exports = {
    validatorGetItem
}