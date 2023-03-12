"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const verifyAuthToken_1 = require("../middlewares/verifyAuthToken");
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes = express_1.default.Router();
dotenv_1.default.config();
const store = new product_1.GetProducts();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (_req, res) => {
    const product = {
        name: _req.body.name,
        price: _req.body.price,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json({ message: `${err.message} Product ${JSON.stringify(product)}` });
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
productRoutes.get('/products', index);
productRoutes.get('/products/:id', show);
productRoutes.post('/products', verifyAuthToken_1.verifyAuthToken, create);
productRoutes.delete('/products/:id', destroy);
exports.default = productRoutes;
