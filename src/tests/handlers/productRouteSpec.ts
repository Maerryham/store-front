import supertest from "supertest";
import productRoutes from "../../handlers/product_route";


const request = supertest(productRoutes);

describe("Test Get Products endpoint with responses", () => {
    it("It should get the Get All Products endpoint", async (
    ) => {
        request
           .get("/api/products")
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });

    it("It should get the GetProduct by  ID endpoint", async (
    ) => {
        request
           .get("/api/products/1")
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });
})
