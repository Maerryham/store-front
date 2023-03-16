import supertest from "supertest";
import Client from "../../database";
import app from "../../server";
import { truncate } from "../../models/others"


const request = supertest(app);

describe("Test All Orders endpoint with responses", () => {
  let token = {};
  const userSample = {
    firstname: 'mariam',
    lastname: 'lawal',
    username: 'lawal',
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
  beforeAll(async() => {
      truncate()

      //It should create user, and authenticate the user and create an order

      await request.post('/users')
            .send(userSample);

        //Sign in User
        const res = await request
            .post('/users/signin')
            .send(userSample);
        
            token = res.body.token;


        // Create a Product
        await request
            .post('/products')
            .send(productSample)
            .set('Authorization', `Bearer ${token}`);

        // Create a Order
        await request
            .post('/orders')
            .send(orderSample)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
  });

  afterAll(async () => {
    truncate()
   });


    it("It should get the Get All Orders endpoint", async (
    ) => {

        request
           .get("/orders")
           .set('Authorization', `Bearer ${token}`)
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });

    it("It should get the GetOrders by User ID endpoint", async (
    ) => {
        request
           .get("/orders/users/1")
           .set('Authorization', `Bearer ${token}`)
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });

    it("It should create Orders", async (
    ) => {
        const response = await request
            .post("/orders")
            .send(orderSample)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
            expect(response.status).toBe(201);
    });
})