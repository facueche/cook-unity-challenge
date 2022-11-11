import { Application, Router } from "express";
import ChefLoginController from "../controllers/auth/ChefLogin.controller";
import ChefRegisterController from "../controllers/auth/ChefRegister.controller";
import CustomerLoginController from "../controllers/auth/CustomerLogin.controller";
import CustomerRegisterController from "../controllers/auth/CustomerRegister.controller";
import RequestFiledsValidation from "../middlewares/RequestFiledsValidation.middleware";
import ChefLoginRequest from "../requests/auth/ChefLogin.request";
import ChefRegisterRequest from "../requests/auth/ChefRegister.request";
import CustomerLoginRequest from "../requests/auth/CustomerLogin.request";
import CustomerRegisterRequest from "../requests/auth/CustomerRegister.request";

export const loadApiEndpoints = (app: Application): void => {
    app.use("/chef", chefRouter);
    app.use("/customer", customerRouter);
};

const chefRouter: Router = Router();
chefRouter.post("/register", ChefRegisterRequest, RequestFiledsValidation, ChefRegisterController);
chefRouter.post("/login", ChefLoginRequest, RequestFiledsValidation, ChefLoginController);

const customerRouter: Router = Router();
customerRouter.post("/register", CustomerRegisterRequest, RequestFiledsValidation, CustomerRegisterController);
customerRouter.post("/login", CustomerLoginRequest, RequestFiledsValidation, CustomerLoginController);