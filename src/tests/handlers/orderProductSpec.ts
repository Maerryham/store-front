import supertest from "supertest";
import userRoutes from "../../handlers/user_route";


const request = supertest(userRoutes);

describe("Test Get OrderProduct endpoint with responses", () => {
    it("It should get addProductToUserOrder endpoint", async (
    ) => {
        request
           .post("/orders/1/products/1")
           .then(response => {
            expect(response.status).toBe(201);
            })
            .catch(error => {
                console.log(error);
            });
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
