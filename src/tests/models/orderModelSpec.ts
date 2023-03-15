import { GetOrders } from '../../models/order';
import Client from "../../database";
import request from 'request';


const store = new GetOrders()

describe("GetOrders Model", () => {
  let token: string;
  const userSample = {
    firstname: 'mariam',
    lastname: 'lawal',
    password: 'password',
  }
  const productSample = {
    name: 'Good Product',
    price: '250'
  }
  const orderSample = {
    user_id: '1',
    status: 'active',
  }
  // beforeAll(async() =>{
  //   // create a user, create a product and then an order

  //   try{
  //     const conn = await Client.connect();
  //     const sql = 'TRUNCATE products, orders, users RESTART IDENTITY';
  //     const result = await conn.query(sql);
  //     conn.release();
  //   }catch(err){
  //     throw new Error(`${err}`);
  //   }

  //   // create a user
  //   token = await request.post('/users').send(userSample);

  //   // Create a product
  //   await request
  //     .post('/products')
  //     .send(productSample)
  //     .set('Authorization', `Bearer ${token}`);
    

  //   // Create a order
  //   await request
  //     .post('/orders')
  //     .send(orderSample)
  //     .set('Authorization', `Bearer ${token}`);

    
  // });








  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a orderByUser method', () => {
    expect(store.orderByUser).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  // it('create method should add a order', async () => {
  //   const result = await store.create({
  //     user_id: '1',
  //     status: 'active',
  //   });
  //   expect(result).toEqual({
  //     id: 1,
  //     user_id: '1',
  //     status: 'active',
  //   });
  // });

  // it('index method should return a list of orders', async () => {
  //   const result = await store.index();
  //   expect(result).toEqual([orderSample]);
  // });

  // it('show method should return the correct order', async () => {
  //   const result = await store.orderByUser("1");
  //   expect(result).toEqual([{
  //     id: 1,
  //     user_id: '1',
  //     status: 'active',
  //   }]);
  // });

  
});