"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.GetProducts();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.title,
            price: req.body.content,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products/:id', destroy);
};
exports.default = productRoutes;
