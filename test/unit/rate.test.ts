import Meal from "../../src/core/domain/models/Meal";
import Rate from "../../src/core/domain/models/Rate";
import Role from "../../src/core/domain/models/Role";
import User from "../../src/core/domain/models/User";

describe("Rating registration", () => {
    it("Uuid is required", () => {
        let tempRate = { ...rate };
        tempRate.uuid = "";

        expect(() => Rate.register(tempRate.uuid, tempRate.customer, tempRate.meal, tempRate.rate)).toThrowError("Uuid is required");
    });

    it("Rate is required", () => {
        let tempRate = { ...rate };
        tempRate.rate = Number.NaN;

        expect(() => Rate.register(tempRate.uuid, tempRate.customer, tempRate.meal, tempRate.rate)).toThrowError("Rate is invalid");
    });

    it("Rate should be between 1 and 5", () => {
        let tempRate = { ...rate };
        tempRate.rate = 0;

        expect(() => Rate.register(tempRate.uuid, tempRate.customer, tempRate.meal, tempRate.rate)).toThrowError("Rate is invalid");

        tempRate.rate = 6;

        expect(() => Rate.register(tempRate.uuid, tempRate.customer, tempRate.meal, tempRate.rate)).toThrowError("Rate is invalid");
    });

    it("Rate should be registered with correct data", () => {
        const tempRate: Rate = Rate.register(rate.uuid, rate.customer, rate.meal, rate.rate);

        expect(tempRate.getUuid()).toBe(rate.uuid);
        expect(tempRate.getCustomer()).toBe(rate.customer);
        expect(tempRate.getMeal()).toBe(rate.meal);
        expect(tempRate.getRate()).toBe(rate.rate);
    });
});

const customer = User.register(
    "123e4567-e89b-12d3-a456-426614174001",
    "customer",
    "secret",
    Role.CUSTOMER
);

const chef = User.register(
    "123e4567-e89b-12d3-a456-426614174002",
    "chefsito",
    "secret",
    Role.CHEF
);

const meal = Meal.register(
    "123e4567-e89b-12d3-a456-426614174003",
    "EggplantParmesan",
    chef
);

const rate = {
    uuid: "123e4567-e89b-12d3-a456-426614174004",
    customer,
    meal,
    rate: 5, // stars
}