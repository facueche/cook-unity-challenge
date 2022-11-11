import request from "supertest";
import app from "../../src/app";
import * as DatabaseConfig from '../databaseConfig';

describe("Chef", () => {
    it("Register username is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.username = "";

        const response = await request(app)
            .post("/chef/register")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("Register password is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.password = "";

        const response = await request(app)
            .post("/chef/register")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("Should register as chef", async () => {
        const response = await request(app)
            .post("/chef/register")
            .send(credentials);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully registered");
    });

    it("Login username is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.username = "";

        const response = await request(app)
            .post("/chef/login")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("Login password is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.password = "";

        const response = await request(app)
            .post("/chef/login")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
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
    it("Register username is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.username = "";

        const response = await request(app)
            .post("/customer/register")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("Register password is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.password = "";

        const response = await request(app)
            .post("/customer/register")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("should register as customer", async () => {
        const response = await request(app)
            .post("/customer/register")
            .send(credentials);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully registered");
    });

    it("Login username is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.username = "";

        const response = await request(app)
            .post("/customer/login")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("Login password is required", async () => {
        let tempCredentials = { ...credentials };
        tempCredentials.password = "";

        const response = await request(app)
            .post("/customer/login")
            .send(tempCredentials);

        expect(response.statusCode).toEqual(422);
    });

    it("Should login as customer", async () => {
        const response = await request(app)
            .post("/customer/login")
            .send(credentials);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("token");
    });

    beforeAll(() => {
        DatabaseConfig.tearUp();
    });

    afterAll(() => {
        DatabaseConfig.tearDown();
    })
});

const credentials = {
    username: "user",
    password: "secret",
};