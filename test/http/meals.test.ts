import * as DatabaseConfig from '../databaseConfig';
import app from "../../src/app";
import AuthService from "../../src/core/application/auth/Auth.service";
import EventManager from "../../src/common/events/Event.manager";
import Meal from "../../src/core/domain/models/Meal";
import MealRepository from "../../src/core/domain/repositories/Meal.repository";
import PrismaMealRepository from "../../src/core/infrastructure/repositories/PrismaMeal.repository";
import PrismaUserRepository from "../../src/core/infrastructure/repositories/PrismaUser.repository";
import request from "supertest";
import Role from "../../src/core/domain/models/Role";
import User from "../../src/core/domain/models/User";
import UserRepository from "../../src/core/domain/repositories/User.repository";

let chefAuthToken: string = "";
let customerAuthToken: string = "";

let chef: User;
let customer: User;

describe("Chef", () => {
    it("should create meals", async () => {
        const response = await request(app)
            .post("/chef/meals")
            .set("Authorization", `Bearer ${chefAuthToken}`)
            .send({ name: "EggplantParmesan" });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Meal created");
    });

    it("Should see his/her list of meals with rate", async () => {
        const response = await request(app)
            .get("/chef/meals")
            .set("Authorization", `Bearer ${chefAuthToken}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("Should not see all the list of meals", async () => {
        const response = await request(app)
            .get("/meals")
            .set("Authorization", `Bearer ${chefAuthToken}`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Unauthorized");
    });

    it("Should not rate a meal", async () => {
        const response = await request(app)
            .post("/meals/<any-uuid>/rate")
            .set("Authorization", `Bearer ${chefAuthToken}`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Unauthorized");
    })
});

describe("Customer", () => {
    it("Should not create meals", async () => {
        const response = await request(app)
            .post("/chef/meals")
            .set("Authorization", `Bearer ${customerAuthToken}`)
            .send({ name: "EggplantParmesan" });

        expect(response.statusCode).toEqual(403);
    });

    it("Should not see chefs' meal list", async () => {
        const response = await request(app)
            .get("/chef/meals")
            .set("Authorization", `Bearer ${customerAuthToken}`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Unauthorized");
    });

    it("Should see list all meals", async () => {
        const response = await request(app)
            .get("/meals")
            .set("Authorization", `Bearer ${customerAuthToken}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("Should filter list of meals by chef", async () => {
        const response = await request(app)
            .get("/meals")
            .set("Authorization", `Bearer ${customerAuthToken}`)
            .query({ chefUuid: chef.getUuid() });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("Should rate meals", async () => {
        const mealRepository: MealRepository = new PrismaMealRepository();
        const mealUuid: string = mealRepository.generateUuid();
        const meal: Meal = Meal.register(mealUuid, "EggplantParmesan", chef);
        EventManager.commitAll();

        const response = await request(app)
            .post(`/meals/${meal.getUuid()}/rate`)
            .set("Authorization", `Bearer ${customerAuthToken}`)
            .send({ rate: 5 });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Rate registered");
    });
});

beforeAll(() => {
    DatabaseConfig.tearUp();
    generateUsersAuthToken();
});

afterAll(() => {
    DatabaseConfig.tearDown();
})

const generateUsersAuthToken = () => {
    const userRepository: UserRepository = new PrismaUserRepository();
    chef = User.register(userRepository.generateUuid(), "chef", "secret", Role.CHEF);
    customer = User.register(userRepository.generateUuid(), "customer", "secret", Role.CUSTOMER);
    EventManager.commitAll();

    const authService: AuthService = new AuthService();
    chefAuthToken = authService.attemptToLogin(chef);
    customerAuthToken = authService.attemptToLogin(customer);
}

const credentials = {
    username: "user",
    password: "secret",
};