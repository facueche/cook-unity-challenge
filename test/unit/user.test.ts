import { equal } from "assert";
import Role from "../../src/domain/Role";
import User from "../../src/domain/User";

describe("User creation", () => {
    it("Uuid is required", () => {
        let user = { ...customer };
        user.uuid = "";

        expect(() => User.register(user.uuid, user.username, user.password, user.role)).toThrowError("Uuid is required");
    });

    it("Usename is required", () => {
        let user = { ...customer };
        user.username = "";

        expect(() => User.register(user.uuid, user.username, user.password, user.role)).toThrowError("Username is required");
    });

    it("Password is required", () => {
        let user = { ...customer };
        user.password = "";

        expect(() => User.register(user.uuid, user.username, user.password, user.role)).toThrowError("Password is required");
    });

    it("Should be registered with correct data", () => {
        const user: User = User.register(customer.uuid, customer.username, customer.password, customer.role);

        expect(user.getUuid()).toBe(customer.uuid);
        expect(user.getUsername()).toBe(customer.username);
        expect(user.getRole()).toBe(customer.role);
    });
});

const customer = {
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    username: "John",
    password: "secret",
    role: Role.CUSTOMER,
};