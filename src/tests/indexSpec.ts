import supertest from "supertest";
import orderRoutes from "../handlers/order_route";


const request = supertest(orderRoutes);

describe("Test Get All Orders endpoint with responses", () => {
    it("It should get the Get All Orders endpoint", async (
    ) => {
        request
           .get("/api/orders")
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });
})