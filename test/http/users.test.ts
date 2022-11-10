import request from "supertest";
import app from "../../src/app";

describe("Chef", () => {
    it("Should register as chef", async () => {
        const response = await request(app)
            .post("/chef/register")
            .send(credentials);
        
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully registered");
    });

    it("Should login as chef", async () => {
        const response = await request(app)
            .post("/chef/login")
            .send(credentials);
        
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("token");
    });
});

describe("Customer", () => {
    it("should register as customer", async () => {
        const response = await request(app)
            .post("/customer/register")
            .send(credentials);
        
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully registered");
    });

    it("Should login as customer", async () => {
        const response = await request(app)
            .post("/customer/login")
            .send(credentials);
        
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("token");
    });
});

const credentials = {
    username: "user",
    password: "secret",
};