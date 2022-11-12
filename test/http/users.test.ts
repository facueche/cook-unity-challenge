import request from "supertest";
import app from "../../src/app";
import EventManager from "../../src/common/events/Event.manager";
import Role from "../../src/core/domain/models/Role";
import User from "../../src/core/domain/models/User";
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
        let tempCredentials = { ...credentials };
        tempCredentials.username = `${credentials.username}_chef`;
        
        await request(app)
            .post("/chef/register")
            .send(tempCredentials);

        const response = await request(app)
            .post("/chef/login")
            .send(tempCredentials);

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
        let tempCredentials = { ...credentials };
        tempCredentials.username = `${credentials.username}_`;
        const response = await request(app)
            .post("/customer/register")
            .send(tempCredentials);

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
        let tempCredentials = { ...credentials };
        tempCredentials.username = `${credentials.username}_customer`;

        await request(app)
            .post("/customer/register")
            .send(tempCredentials);

        const response = await request(app)
            .post("/customer/login")
            .send(credentials);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("token");
    });
});

describe('User', () => {
    it("Should not be registered with an existing username", async () => {
        let tempUuid = "123e4567-e89b-12d3-a456-426614174005";
        User.register(tempUuid, credentials.username, credentials.password, Role.CHEF);
        EventManager.commitAll();

        const chefResponse = await request(app)
            .post("/chef/register")
            .send(credentials);

        expect(chefResponse.statusCode).toEqual(409);
        expect(chefResponse.body).toHaveProperty("error");
        expect(chefResponse.body.error).toEqual("Username already exists");

        tempUuid = "123e4567-e89b-12d3-a456-426614174006";
        User.register(tempUuid, credentials.username, credentials.password, Role.CUSTOMER);
        EventManager.commitAll();

        const customerResponse = await request(app)
            .post("/customer/register")
            .send(credentials);

        expect(customerResponse.statusCode).toEqual(409);
        expect(customerResponse.body).toHaveProperty("error");
        expect(customerResponse.body.error).toEqual("Username already exists");
    });
})


beforeAll(() => {
    DatabaseConfig.tearUp();
});

afterAll(() => {
    DatabaseConfig.tearDown();
})

const credentials = {
    username: "user",
    password: "secret",
};