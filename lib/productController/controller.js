"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const Products = require("../productModel/modal");
const utils_1 = require("../utils");
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000,
    "Content-type": "application/json",
    /** add other headers as per requirement */
};
//@DESC GET all products
//@Route /api/products
async function getProducts(req, res) {
    try {
        const products = await Products.find();
        res.writeHead(200, headers);
        res.end(JSON.stringify(products));
    }
    catch (error) {
        console.log(error);
    }
}
exports.getProducts = getProducts;
//@DESC GET single products
//@Route /api/products
async function getProduct(req, res, id) {
    try {
        const product = await Products.findById(id);
        if (!product) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: "product doesn't exist" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.getProduct = getProduct;
//@DESC Create a product
//@Route /api/products
async function createProduct(req, res) {
    try {
        let body = await (0, utils_1.getPostData)(req);
        // console.log(typeof body);
        body = JSON.parse(body);
        // console.log(typeof body)
        const { productName, productDescription, productVarieties: [{ size, color, quantity, image, price }], dateUpload, } = body;
        const product = {
            productName,
            productDescription,
            productVarieties: [
                {
                    size,
                    color,
                    quantity,
                    image,
                    price,
                },
            ],
            dateUpload: new Date().toISOString(),
        };
        const newProduct = await Products.create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
    }
    catch (error) {
        console.log(error);
    }
}
exports.createProduct = createProduct;
// @DESC Update a product
// @Route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Products.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "product doesn't exist" }));
        }
        else {
            let body = await (0, utils_1.getPostData)(req);
            body = JSON.parse(body);
            //   console.log(typeof body);
            const { productName, productDescription, productVarieties, dateUpload, } = body;
            const productData = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productDescription,
                productVarieties: productVarieties || product.productVarieties,
                dateEdited: new Date().toISOString()
            };
            const updatedProduct = await Products.update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updatedProduct));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateProduct = updateProduct;
//@DESC DELETE single products
//@Route delete /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Products.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "product doesn't exist" }));
        }
        else {
            await Products.remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product with the ${id} has been deleted` }));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteProduct = deleteProduct;
