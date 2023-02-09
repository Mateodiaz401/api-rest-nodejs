const { matchedData } = require("express-validator")
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 *  Obtener la lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({ data, user })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
}

/**
 *  Obtiene un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findOneData(id);
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")

    }

}


/**
 *  Crea un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body)
        res.send({ data })

    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

/**
 *  Actualiza un registro de la bas de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await tracksModel.findByIdAndUpdate(
            id, body
        );
        res.send({ data })

    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }

}

/**
 *  Elimina un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({ _id: id });
        console.log(data);
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}