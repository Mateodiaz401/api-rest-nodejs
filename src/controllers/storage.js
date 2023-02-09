const fs = require("fs")
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../../storage`;
/**
 *  Obtener la lista de base de datos
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data })
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_LIST_ITEMS");
    }
}

/**
 *  Obtiene un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DETAILS_ITEM");
    }
}


/**
 *  Crea un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }

}

/**
 *  Actualiza un registro de la bas de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
}

/**
 *  Elimina un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({ _id: id })
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            filename,
            deleted: 1
        }
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}