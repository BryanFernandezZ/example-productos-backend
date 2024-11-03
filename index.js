const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerConfig = require('./swagger-config');

const app = express();
const API_URL = "/api/v1/productos"

let lastedId = 1;

let PRODUCTOS = [];

app.use(cors());
app.use(bodyParser.json());


const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * /api/v1/productos/listar:
 *   get:
 *     summary: Listar todos los productos
 *     responses:
 *       200:
 *         description: Éxito al obtener la lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     productos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           producto:
 *                             type: string
 *                           precio:
 *                             type: number
 *                           categoria:
 *                             type: string
 */
app.get(API_URL + "/listar", (req, res) => {
    res.send(
        {
            ok: true,
            message: "La consulta devolvio informacion",
            data: {
                productos: PRODUCTOS,
            }
        }
    );
});


/**
 * @swagger
 * /api/v1/productos/obtener/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Éxito al obtener el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     producto:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         producto:
 *                           type: string
 *                         precio:
 *                           type: number
 *                         categoria:
 *                           type: string
 */
app.get(API_URL + "/obtener/:id", (req, res) => {
    const productoId = req.params.id;
    res.json(
        {
            ok: true,
            message: "La consulta devolvio informacion",
            data: {
                producto: PRODUCTOS.find(p => p.id === parseInt(productoId)),
            }
        }
    )
});


/**
 * @swagger
 * /api/v1/productos/crear:
 *   post:
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.post(API_URL + "/guardar",  (req, res) => {
    const producto = req.body;
    PRODUCTOS.push(
        {
            id: lastedId++,
            producto: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria,
        }
    );
    res.send(
        {
            ok: true,
            message: "Se guardo correctamente",
            data: {}
        }
    )
});



/**
 * @swagger
 * /api/v1/productos/actualizar/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.put(API_URL + "/actualizar/:id", (req, res) => {
    const productoId = req.params.id;
    const producto = req.body;

    const productoLista = PRODUCTOS.find(p => p.id === parseInt(productoId));
    const indexOf = PRODUCTOS.indexOf(productoLista);
    
    productoLista.producto = producto.nombre;
    productoLista.precio = producto.precio;
    productoLista.categoria = producto.categoria;

    PRODUCTOS[indexOf] = productoLista;

    res.send(
        {
            ok: true,
            message: "Se actualizo correctamente",
            data: {},
        }
    );
});



/**
 * @swagger
 * /api/v1/productos/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.delete(API_URL + "/eliminar/:id", (req, res) => {
    const productoId = req.params.id;
    PRODUCTOS = [...PRODUCTOS.filter(p =>  p.id !== parseInt(productoId))];
    res.send(
        {
            ok: true,
            message: "Se elimino correctamente",
            data: {}
        }
    )
});

app.listen(8080, () => {
    console.log("Server on port ", 8080);
});
