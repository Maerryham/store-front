import supertest from "supertest";
import app from "../../server";


const request = supertest(app);

describe("Test Get All Users endpoint with responses", () => {
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
