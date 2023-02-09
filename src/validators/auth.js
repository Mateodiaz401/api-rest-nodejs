const { check } = require("express-validator");

const validateResult = require("../utils/handlevalidator")

const validatorRegister = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 100 }),
    check("age")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validatorLogin = [
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


module.exports = {
    validatorRegister,
    validatorLogin,
}