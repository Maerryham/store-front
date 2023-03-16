import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import productRoutes from './handlers/product_route';
import userRoutes from './handlers/user_route';
import orderRoutes from './handlers/order_route';
import orderProductRoutes from './handlers/order_product_route';


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.listen(3000, function () {
    console.log(`Server is running on ${address}`)
})

//Log request
app.use(morgan('tiny'));

//Load Routers
// app.use('/api', productRoutes);
// app.use('/api', userRoutes);
productRoutes(app);
userRoutes(app);
orderRoutes(app)
orderProductRoutes(app)
// app.use('/api', orderRoutes);
// app.use('/api', orderProductRoutes);
