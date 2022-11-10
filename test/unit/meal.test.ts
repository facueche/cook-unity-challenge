import Meal from "../../src/domain/Meal";
import Role from "../../src/domain/Role";
import User from "../../src/domain/User";

describe("Meal creation", () => {
    it("Uuid is required", () => {
        let tempMeal = { ...meal };
        tempMeal.uuid = "";

        expect(() => Meal.register(tempMeal.uuid, tempMeal.name, tempMeal.chef)).toThrowError("Uuid is required");
    });

    it("Name is required", () => {
        let tempMeal = { ...meal };
        tempMeal.name = "";

        expect(() => Meal.register(tempMeal.uuid, tempMeal.name, tempMeal.chef)).toThrowError("Name is required");
    });

    it("Should be created with correct data", () => {
        const tempMeal: Meal = Meal.register(meal.uuid, meal.name, meal.chef);

        expect(tempMeal.getUuid()).toBe(meal.uuid);
        expect(tempMeal.getName()).toBe(meal.name);
        expect(tempMeal.getChef()).toBe(meal.chef);
    });
});

const chef = User.register(
    "123e4567-e89b-12d3-a456-426614174001",
    "chefsito",
    "secret",
    Role.CHEF
);

const meal = {
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    name: "EggplantParmesan",
    chef
};