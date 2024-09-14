import { Router } from "express";
import productHandler from "./handlers/products";
import { handleInputError, handleInvalidParam } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor curvo de 49 pulgadas
 *        price:
 *          type: number
 *          description: The product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: false
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Gets a list of products
 *    tags:
 *      - Products
 *    description: Returns a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Product"
 */

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor curvo de 49 pulgadas"
 *              price:
 *                type: number
 *                example: 200
 *    responses:
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad request - Invalid input data
 */
router.route("/")
  .get(productHandler.getProducts)
  .post(handleInputError, productHandler.createProduct);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    summary: Gets a product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the update product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor curvo de 49 pulgadas"
 *              price:
 *                type: number
 *                example: 200
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad request - Invalid ID or input data
 *      404:
 *        description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *    summary: Updates product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    summary: Deletes a product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: string
 *                  example: "Product has been successfully deleted"
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.route("/:id")
  .get(handleInvalidParam, productHandler.getProductById)
  .put(handleInvalidParam, handleInputError, productHandler.updateProduct)
  .patch(handleInvalidParam, productHandler.updateAvailability)
  .delete(handleInvalidParam, productHandler.deleteProduct);

export default router;
