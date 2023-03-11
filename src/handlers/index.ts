import express from 'express';
import productRoutes from './product_route';
const routes = express.Router();


routes.use('/images', productRoutes);
export default routes;
