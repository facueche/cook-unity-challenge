import { Application, Router } from "express";
import Role from "../../domain/models/Role";
import ChefLoginController from "../controllers/auth/ChefLogin.controller";
import ChefRegisterController from "../controllers/auth/ChefRegister.controller";
import CustomerLoginController from "../controllers/auth/CustomerLogin.controller";
import CustomerRegisterController from "../controllers/auth/CustomerRegister.controller";
import CreateMealController from "../controllers/meals/CreateMeal.controller";
import RateMealController from "../controllers/meals/RateMeal.controller";
import ShowAllMealsController from "../controllers/meals/ShowAllMeals.controller";
import ShowChefMealsController from "../controllers/meals/ShowChefMeals.controller";
import AuthTokenMiddleware from "../middlewares/AuthToken.middleware";
import RequestFiledsValidation from "../middlewares/RequestFiledsValidation.middleware";
import RoleMiddleware from "../middlewares/Role.middleware";
import ChefLoginRequest from "../requests/auth/ChefLogin.request";
import ChefRegisterRequest from "../requests/auth/ChefRegister.request";
import CustomerLoginRequest from "../requests/auth/CustomerLogin.request";
import CustomerRegisterRequest from "../requests/auth/CustomerRegister.request";
import CreateMealRequest from "../requests/meals/CreateMeal.request";

export const loadApiEndpoints = (app: Application): void => {
    app.use("/chef", chefRouter);
    app.use("/customer", customerRouter);
    app.use("/meals", mealRouter);
};

/** CHEF */
const chefRouter: Router = Router();
chefRouter.post(
    "/register",
    ChefRegisterRequest,
    RequestFiledsValidation,
    ChefRegisterController
);
chefRouter.post(
    "/login",
    ChefLoginRequest,
    RequestFiledsValidation,
    ChefLoginController
);
chefRouter.post(
    "/meals",
    AuthTokenMiddleware,
    RoleMiddleware(Role.CHEF),
    CreateMealRequest,
    RequestFiledsValidation,
    CreateMealController
);
chefRouter.get(
    "/meals",
    AuthTokenMiddleware,
    RoleMiddleware(Role.CHEF),
    ShowChefMealsController
);

/** CUSTOMER */
const customerRouter: Router = Router();
customerRouter.post(
    "/register",
    CustomerRegisterRequest,
    RequestFiledsValidation,
    CustomerRegisterController
);
customerRouter.post(
    "/login",
    CustomerLoginRequest,
    RequestFiledsValidation,
    CustomerLoginController
);

/** MEAL */
const mealRouter: Router = Router();
mealRouter.post(
    "/:uuid/rate",
    AuthTokenMiddleware,
    RoleMiddleware(Role.CUSTOMER),
    RateMealController
);
mealRouter.get(
    "/",
    AuthTokenMiddleware,
    RoleMiddleware(Role.CUSTOMER),
    ShowAllMealsController
);