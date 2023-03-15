import express from 'express';
import orderRoutes from './order_route';
// import orderProductRoutes from './order_product_route';

const routes = express.Router();



routes.use('/', orderRoutes);
// routes.use('/', orderProductRoutes);

export default routes;
