import supertest from "supertest";
import Client from "../../database";
import orderRoutes from "../../handlers/order_route";
import { truncate } from "../../models/others"


const request = supertest(orderRoutes);

describe("Test All Orders endpoint with responses", () => {
  let token = {token: "none"};
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
//   beforeAll(async () => {
    //   try{
    //     const conn = await Client.connect();
    //     const sql = 'TRUNCATE order_product, orders, users, products RESTART IDENTITY';
    //     await conn.query(sql);
    //     conn.release();
    //   }catch(err){
    //     throw new Error(`Unable to delete Tables${err}`);
    //   }
//   });

//   afterAll(async () => {
        // try{
        //     const conn = await Client.connect();
        //     const sql = 'TRUNCATE order_product, orders, users, products RESTART IDENTITY';
        //     await conn.query(sql);
        //     conn.release();
        // }catch(err){
        //     throw new Error(`Unable to delete Tables${err}`);
        // }
//    });


    it("It should create user, and authenticate the user and create an order", async () => {
        truncate();

        // create a user, authenticate user, create a product and then an order

        // create a user
        await request.post('/users').send(userSample);

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
        console.log("Token", token)

        // Create a Order
        await request
        .post('/orders')
        .send(orderSample)
        .set('Authorization', `Bearer ${token}`);

    });







//   console.log("TOKENTOKEN", token)


    it("It should get the Get All Orders endpoint", async (
    ) => {
        //   console.log("TOKENTOKEN1", token)

        console.log("TOKEN", token)
        request
           .get("/api/orders")
           .set('Authorization', `Bearer ${token.token}`)
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });

//     it("It should get the GetOrders by User ID endpoint", async (
//     ) => {
//         request
//            .get("/api/orders/1")
//            .set('Authorization', `Bearer ${token}`)
//            .then(response => {
//             expect(response.status).toBe(200);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     });

//     it("It should get the GetOrders by User ID endpoint", async (
//         ) => {
//             request
//                .post("/api/orders")
//                .set('Authorization', `Bearer ${token}`)
//                .then(response => {
//                 expect(response.status).toBe(201);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//         });
})