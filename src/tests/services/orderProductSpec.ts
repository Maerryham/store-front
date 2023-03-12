import supertest from "supertest";
import userRoutes from "../../handlers/user_route";


const request = supertest(userRoutes);

describe("Test Get OrderProduct endpoint with responses", () => {
    it("It should get the Get All Users endpoint", async (
    ) => {
        request
           .get("/api/users")
           .then(response => {
            expect(response.status).toBe(200);
            })
            .catch(error => {
                console.log(error);
            });
    });
})
