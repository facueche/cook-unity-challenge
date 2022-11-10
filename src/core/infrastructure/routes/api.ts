import { Application, Router } from "express";
import ChefLoginController from "../controllers/auth/ChefLogin.controller";
import ChefRegisterController from "../controllers/auth/ChefRegister.controller";
import CustomerLoginController from "../controllers/auth/CustomerLogin.controller";
import CustomerRegisterController from "../controllers/auth/CustomerRegister.controller";

export const loadApiEndpoints = (app: Application): void => {
    app.use("/chef", chefRouter);
    app.use("/customer", customerRouter);
};

const chefRouter: Router = Router();
chefRouter.post("/register", ChefRegisterController);
chefRouter.post("/login", ChefLoginController);

const customerRouter: Router = Router();
customerRouter.post("/register", CustomerRegisterController);
customerRouter.post("/login", CustomerLoginController);