"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProducts = void 0;
const database_1 = __importDefault(require("../database"));
class GetProducts {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get products ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id =${id}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to get product ${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(sql, [...Object.values(product)]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to create product ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM products WHERE id = ${id}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to delete product ${err}`);
        }
    }
}
exports.GetProducts = GetProducts;
