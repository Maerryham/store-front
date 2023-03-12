import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import routes from './handlers/index';
import productRoutes from './handlers/product_route';
import userRoutes from './handlers/user_route';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.listen(3000, function () {
    console.log(`Server is running on ${address}`)
})

//Log request
app.use(morgan('tiny'));

//Load Routers
app.use('/api', productRoutes);
app.use('/api', userRoutes);


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});