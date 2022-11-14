import Meal from "../../src/core/domain/models/Meal";
import Rate from "../../src/core/domain/models/Rate";
import Role from "../../src/core/domain/models/Role";
import User from "../../src/core/domain/models/User";

describe("Rating registration", () => {
    it("Uuid is required", () => {
        let tempRate = { ...rate };
        tempRate.uuid = "";

        expect(() => Rate.make(tempRate.uuid, tempRate.customer, tempRate.rate)).toThrowError("Uuid is required");
    });

    it("Rate is required", () => {
        let tempRate = { ...rate };
        tempRate.rate = Number.NaN;

        expect(() => Rate.make(tempRate.uuid, tempRate.customer, tempRate.rate)).toThrowError("Rate is invalid");
    });

    it("Rate should be between 1 and 5", () => {
        let tempRate = { ...rate };
        tempRate.rate = 0;

        expect(() => Rate.make(tempRate.uuid, tempRate.customer, tempRate.rate)).toThrowError("Rate is invalid");

        tempRate.rate = 6;

        expect(() => Rate.make(tempRate.uuid, tempRate.customer, tempRate.rate)).toThrowError("Rate is invalid");
    });

    it("Rate should be registered with correct data", () => {
        const tempRate: Rate = Rate.make(rate.uuid, rate.customer, rate.rate);

        expect(tempRate.getUuid()).toBe(rate.uuid);
        expect(tempRate.getCustomer()).toBe(rate.customer);
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

const rate = {
    uuid: "123e4567-e89b-12d3-a456-426614174004",
    customer,
    rate: 5, // stars
}