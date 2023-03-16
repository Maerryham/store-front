import supertest from "supertest";
import app from "../../server";
import { truncate } from "../../models/others"

const request = supertest(app);

describe("Test Get OrderProduct endpoint with responses", () => {
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

  const orderProductSample = {
    quantity: 300
  }
  beforeAll(async() => {
    truncate()

      //It should create user, and authenticate the user and create an order
      await request.post('/users')
            .send(userSample);

        //Sign in User
        const res = await request
            .post('/users/signin')
            .send(userSample)
            .set('Content-Type', 'application/json');
        
            token = res.body.token;


        // Create a Product
        await request
            .post('/products')
            .send(productSample)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        // Create a Order
        await request
            .post('/orders')
            .send(orderSample)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        // Add product to Order
        await request
            .post('/orders')
            .send(orderSample)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
  });

  afterAll(async () => {
        // truncate()
   });
    it("It should get addProductToUserOrder endpoint", async (
    ) => {
        const response = await  request
           .post("/orders/1/products/1")
           .send(orderProductSample)
           .set('Authorization', `Bearer ${token}`)
           .set('Content-Type', 'application/json');
            expect(response.status).toBe(201);
    });

    

    it("It should get the productsInUserOrder endpoint", async (
        ) => {
            request
               .get("/users/1/orders")
               .then(response => {
                expect(response.status).toBe(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
})
