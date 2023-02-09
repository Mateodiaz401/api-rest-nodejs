const express = require("express");
const { createItem, getItem, getItems, deleteItem } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");
const authMiddleware = require("../middleware/session");
const router = express.Router();

/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Listar archivos"
 *      description: Obtén todas las listas de las archivos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las archivos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validación.
 */
router.get("/", authMiddleware, getItems);
/**
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Detalle storage"
 *      description: Obtén el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de storage a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validación.
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: Subir un archivo
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la colección.
 *        '422':
 *          description: Error de validación.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la colección con estado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);
/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Eliminar storage"
 *      description: Elimiar el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *        '422':
 *          description: Error de validación.
 */
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;